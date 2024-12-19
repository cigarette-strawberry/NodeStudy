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
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/get', (req, res) => {
  res.json({
    code: 200,
    message: 'get/Hello World!'
  });
});

app.patch('/patch', (req, res) => {
  res.json({
    code: 200,
    message: 'patch/Hello World!'
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
