// Free AI chat page - plain static file server.
// Serves index.html and a /health endpoint. Node built-ins only.
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = parseInt(process.env.PORT || '8080', 10);
const indexPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexPath);
const hubPath = path.join(__dirname, 'hub.html');
const hubHtml = fs.readFileSync(hubPath);

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  if (url === '/hub') {
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-cache',
    });
    res.end(hubHtml);
    return;
  }
  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-cache',
  });
  res.end(indexHtml);
});

server.listen(port, '0.0.0.0', () => {
  console.log('free-chat listening on port ' + port);
});
