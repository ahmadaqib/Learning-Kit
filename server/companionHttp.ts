import type { IncomingMessage, ServerResponse } from 'node:http';
import { createCompanionService, type CompanionConfig } from './companion.js';
import { createTutorService, TUTOR_MAX_BYTES, type TutorConfig } from './tutor.js';
import { createChatService, CHAT_MAX_BYTES, type ChatConfig } from './chat.js';

type Serve = (request: Request, clientId: string) => Promise<Response>;

/** Adapts a fetch-style service to Vercel functions and the Vite dev server, keeping the body size limit. */
export function nodeHandler(serve: Serve, path: string, maxBytes: number, methods: readonly string[] = ['POST']) {
  return async (req: IncomingMessage & { body?: unknown }, res: ServerResponse) => {
    const reject = (status: number) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end('{"error":"request"}');
    };
    const method = req.method ?? '';
    if (!methods.includes(method)) return reject(405);
    if (Number(req.headers['content-length']) > maxBytes) return reject(413);
    try {
      let body = '';
      // Vercel may supply an already parsed body. Vite supplies a Node stream.
      if (method === 'GET') {
        // no body; the context is in the query string
      } else if (req.body !== undefined) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      } else {
        let bytes = 0;
        for await (const chunk of req) {
          bytes += Buffer.byteLength(chunk);
          if (bytes > maxBytes) return reject(413);
          body += chunk.toString();
        }
      }
      if (Buffer.byteLength(body) > maxBytes) return reject(413);
      const headers = new Headers();
      for (const header of ['content-type', 'origin', 'sec-fetch-site']) {
        const value = req.headers[header];
        if (typeof value === 'string') headers.set(header, value);
      }
      const forwarded = req.headers['x-forwarded-for'];
      const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.socket.remoteAddress || 'unknown';
      // Learners behind one school IP get separate limits per browser; the WAF rule still caps the IP.
      const device = req.headers['x-pw-device'];
      const clientId = typeof device === 'string' && /^[a-z0-9-]{16,64}$/.test(device) ? ip + '|' + device : ip;
      const scheme = req.headers['x-forwarded-proto'] === 'https' || ('encrypted' in req.socket && req.socket.encrypted) ? 'https' : 'http';
      const url = new URL(path, scheme + '://' + req.headers.host);
      if (method === 'GET') url.search = new URL(req.url ?? '', 'http://local').search;
      const reply = await serve(new Request(url, method === 'GET' ? { method, headers } : { method, headers, body }), clientId);
      res.writeHead(reply.status, Object.fromEntries(reply.headers));
      if (!reply.body || !(reply.headers.get('content-type') ?? '').includes('ndjson')) {
        res.end(await reply.text());
        return;
      }
      // Pass each streamed piece on as it arrives; if the learner leaves, stop the upstream call.
      const reader = reply.body.getReader();
      res.on('close', () => {
        if (!res.writableEnded) void reader.cancel();
      });
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
      res.end();
    } catch {
      reject(503);
    }
  };
}

export function companionHttp(getConfig: () => CompanionConfig) {
  return nodeHandler(createCompanionService(getConfig), '/api/companion', 512, ['GET', 'POST']);
}

export function tutorHttp(getConfig: () => TutorConfig) {
  return nodeHandler(createTutorService(getConfig), '/api/tutor', TUTOR_MAX_BYTES);
}

export function chatHttp(getConfig: () => ChatConfig) {
  return nodeHandler(createChatService(getConfig), '/api/chat', CHAT_MAX_BYTES);
}
