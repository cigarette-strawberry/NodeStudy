const http = require('node:http');
const url = require('node:url');

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    if (pathname === '/api') {
      console.log(pathname);

      res.end('success proxy');
    }
  })
  .listen(4000, () => {
    console.log('Server is running on port 4000');
  });
