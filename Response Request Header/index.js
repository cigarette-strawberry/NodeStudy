const express = require('express');

const app = express();

app.use((req, res, next) => {
  // Access-Control-Allow-Origin 参数 '* ｜ Origin'
  // '*' 允许所有资源进行访问 但获取不到session信息
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // 指定允许访问的域名
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');

  // Access-Control-Allow-Methods 默认只支持 GET POST HEAD
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

  // Access-Control-Allow-Headers 支持 application/json
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', (req, res) => {
  res.set('mini', 1234); // 自定义响应头
  res.setHeader('Access-Control-Expose-Headers', 'mini'); // 后端必须抛出来
  res.json({
    code: 200,
    message: 'Hello World!'
  });
});

app.get('/get', (req, res) => {
  res.json({
    code: 200,
    message: 'get/Hello World!'
  });
});

app.post('/post', (req, res) => {
  res.json({
    code: 200,
    message: 'post/Hello World!'
  });
});

app.patch('/patch', (req, res) => {
  res.json({
    code: 200,
    message: 'patch/Hello World!'
  });
});

/**
 *  预检请求 OPTIONS 这个请求是浏览器发起的
 * 需要满足下面条件之一才会发起
 * 1、Content-Type application/json
 * 2、自定义请求头
 * 3、非普通请求(get,post)   PATCH, PUT, DELETE
 * */

/**
 *  sse
 * webSocket 实时通讯 前端给后端发 后端也可以给前端发
 * 全双工通讯
 *
 *
 * 大屏项目 后端需要实时返回给前端 前端不需要传递信息
 * 单工通讯 也就是说 只能后端给前端发
 * */

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  setInterval(() => {
    res.write(`event: test\n`); // 默认是message
    res.write(`data: ${new Date().toISOString()} - Hello SSE\n\n`);
  }, 1000);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
