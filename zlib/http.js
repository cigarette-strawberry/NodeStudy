const zlib = require('node:zlib');
const http = require('node:http');

// 未压缩 11.2kb
// gzip 压缩 261b
// deflate 压缩 252b
const server = http.createServer((req, res) => {
  const body = 'Hello World'.repeat(1000);
  res.setHeader('Content-Encoding', 'deflate');
  res.setHeader('Content-type', 'text/plain; charset=utf-8');
  const response = zlib.deflateSync(body);
  res.end(response);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
