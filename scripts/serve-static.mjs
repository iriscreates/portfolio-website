import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../dist/client/', import.meta.url)));
const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const host = getArg('--host', process.env.HOST ?? '0.0.0.0');
const port = Number(getArg('--port', process.env.PORT ?? '4173'));
const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

const resolveRequestPath = (requestUrl) => {
  const pathname = decodeURIComponent(new URL(requestUrl, 'http://localhost').pathname);
  const relative = pathname.replace(/^\/+/, '');
  const candidate = normalize(join(root, relative));
  if (candidate !== root && !candidate.startsWith(root + '\\')) return null;
  return candidate;
};

const findFile = async (candidate) => {
  const candidates = [candidate];
  if (candidate.endsWith('\\') || candidate.endsWith('/')) candidates.push(join(candidate, 'index.html'));
  else candidates.push(join(candidate, 'index.html'));
  for (const file of candidates) {
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {
      // Continue to the next static path candidate.
    }
  }
  return null;
};

const server = createServer(async (request, response) => {
  try {
    const candidate = request.url ? resolveRequestPath(request.url) : null;
    const file = candidate ? await findFile(candidate) : null;
    if (!file) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const extension = extname(file).toLowerCase();
    response.writeHead(200, {
      'cache-control': extension === '.html' ? 'no-cache' : 'public, max-age=3600',
      'content-type': contentTypes[extension] ?? 'application/octet-stream',
    });
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  } catch {
    response.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Bad request');
  }
});

server.listen(port, host, () => {
  console.log(`Static preview: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/`);
});
