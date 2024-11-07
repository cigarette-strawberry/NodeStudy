import express from 'express';
import logger from './middleware/logger.js';
import list from './src/list.js';
import user from './src/user.js';

const app = express();
app.use(express.json()); // 解析json格式的请求体

app.use(logger);

app.use('/list', list);
app.use('/user', user);

// 获取前端参数 req.query
app.get('/get', (req, res) => {
  console.log(req.query);

  res.send('get');
});

// 获取前端 动态参数 req.params
app.get('/get/:id', (req, res) => {
  console.log(req.params);

  res.send('动态参数');
});

// 获取前端参数 req.body
app.post('/post', (req, res) => {
  console.log(req.body);

  res.send('post');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
