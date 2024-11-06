import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import mime from 'mime';

http
  .createServer((req, res) => {
    const { method, url } = req;
    // 静态资源
    if (method === 'GET' && url.startsWith('/static')) {
      const staticPath = path.join(process.cwd(), url);
      fs.readFile(staticPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
        } else {
          console.log(666);
          const type = mime.getType(staticPath);
          res.writeHead(200, { 'Content-Type': type, 'cache-control': 'public, max-age=3600' });
          res.end(data);
        }
      });
    }
    // 动态资源
    if ((method === 'GET' || method === 'POST') && url.startsWith('/api')) {
      // 接口逻辑
    }
  })
  .listen(3000, () => {
    console.log('Server is running on port 3000');
  });
