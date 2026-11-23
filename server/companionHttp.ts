import type { IncomingMessage, ServerResponse } from 'node:http';
import { createCompanionService, type CompanionConfig } from './companion.js';

export function companionHttp(getConfig: () => CompanionConfig) {
  const serve = createCompanionService(getConfig);
  return async (req: IncomingMessage & { body?: unknown }, res: ServerResponse) => {
    const reject = (status: number) => {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end('{"error":"request"}');
    };
    if (req.method !== 'POST') return reject(405);
    if (Number(req.headers['content-length']) > 512) return reject(413);
    try {
      let body = '';
      // Vercel may supply an already parsed body. Vite supplies a Node stream.
      if (req.body !== undefined) {
        body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      } else {
        let bytes = 0;
        for await (const chunk of req) {
          bytes += Buffer.byteLength(chunk);
          if (bytes > 512) return reject(413);
          body += chunk.toString();
        }
      }
      if (Buffer.byteLength(body) > 512) return reject(413);
      const headers = new Headers();
      for (const header of ['content-type', 'origin', 'sec-fetch-site']) {
        const value = req.headers[header];
        if (typeof value === 'string') headers.set(header, value);
      }
      const scheme = req.headers['x-forwarded-proto'] === 'https' || ('encrypted' in req.socket && req.socket.encrypted) ? 'https' : 'http';
      const url = new URL('/api/companion', scheme + '://' + req.headers.host);
      const reply = await serve(new Request(url, { method: 'POST', headers, body }));
      res.writeHead(reply.status, Object.fromEntries(reply.headers));
      res.end(await reply.text());
    } catch {
      reject(503);
    }
  };
}
