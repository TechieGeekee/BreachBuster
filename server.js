import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { extname } from 'path';

const PORT = 5000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = createServer((req, res) => {
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = filePath.startsWith('/') ? filePath.slice(1) : filePath;
  
  // Handle figmaAssets
  if (filePath.startsWith('figmaAssets/')) {
    filePath = filePath;
  }
  
  if (!existsSync(filePath)) {
    res.writeHead(404);
    res.end('File not found');
    return;
  }
  
  const ext = extname(filePath);
  const contentType = mimeTypes[ext] || 'text/plain';
  
  res.writeHead(200, { 
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });
  
  const content = readFileSync(filePath);
  res.end(content);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🛡️ Breach Buster server running at http://0.0.0.0:${PORT}/`);
  console.log('🚀 Your cyber security app is ready!');
});