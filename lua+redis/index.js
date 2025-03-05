import express from 'express';
import Redis from 'ioredis';
import fs from 'node:fs';
const app = express();
const redis = new Redis({ host: '', port: '', password: '' });
const lua = fs.readFileSync('./index.lua', 'utf8');

// 限流阀
const KEY = 'lottery'; // Redis存储的内容
const MAX = 10;
const TIME = 30; // 30s内
const LIMIT = 5; // 操作5次

app.use('*', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/lottery', (req, res) => {
  redis.eval(lua, 1, KEY, MAX, TIME, LIMIT, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result === 1) {
      res.send('抽奖成功');
    } else {
      res.send('请稍后重试');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
