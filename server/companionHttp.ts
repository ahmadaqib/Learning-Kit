import type { IncomingMessage, ServerResponse } from 'node:http';
import { createCompanionService, type CompanionConfig } from './companion.js';
import { createTutorService, TUTOR_MAX_BYTES, type TutorConfig } from './tutor.js';

type Serve = (request: Request, clientId: string) => Promise<Response>;

/** Adapts a fetch-style service to Vercel functions and the Vite dev server, keeping the body size limit. */
export function nodeHandler(serve: Serve, path: string, maxBytes: number) {
  return async (req: IncomingMessage & { body?: unknown }, res: ServerResponse) => {
    const reject = (status: number) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end('{"error":"request"}');
    };
    if (req.method !== 'POST') return reject(405);
    if (Number(req.headers['content-length']) > maxBytes) return reject(413);
    try {
      let body = '';
      // Vercel may supply an already parsed body. Vite supplies a Node stream.
      if (req.body !== undefined) {
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
      const clientId = (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : '') || req.socket.remoteAddress || 'unknown';
      const scheme = req.headers['x-forwarded-proto'] === 'https' || ('encrypted' in req.socket && req.socket.encrypted) ? 'https' : 'http';
      const url = new URL(path, scheme + '://' + req.headers.host);
      const reply = await serve(new Request(url, { method: 'POST', headers, body }), clientId);
      res.writeHead(reply.status, Object.fromEntries(reply.headers));
      res.end(await reply.text());
    } catch {
      reject(503);
    }
  };
}

export function companionHttp(getConfig: () => CompanionConfig) {
  return nodeHandler(createCompanionService(getConfig), '/api/companion', 512);
}

export function tutorHttp(getConfig: () => TutorConfig) {
  return nodeHandler(createTutorService(getConfig), '/api/tutor', TUTOR_MAX_BYTES);
}
