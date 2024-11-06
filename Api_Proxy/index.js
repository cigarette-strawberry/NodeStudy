const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');
const { createProxyMiddleware } = require('http-proxy-middleware');

const html = fs.readFileSync('./index.html', 'utf-8');
const config = require('./test.config.js');

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    // console.log(pathname);
    const proxyList = Object.keys(config.serve.proxy);
    // console.log(proxyList);
    if (proxyList.includes(pathname)) {
      createProxyMiddleware(config.serve.proxy[pathname])(req, res);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  })
  .listen(3000, () => {
    console.log('Server is running on port 3000');
  });
