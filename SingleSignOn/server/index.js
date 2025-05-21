import express from 'express';
import cors from 'cors';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import session from 'express-session';

const appToMapUrl = {
  //A应用id
  Rs6s2aHi: {
    url: 'http://localhost:5173', //对应的应用地址
    secretKey: '%Y&*VGHJKLsjkas', //对应的secretKey
    token: '', //token
    name: 'react'
  },
  //B应用id
  '9LQ8Y3mB': {
    url: 'http://localhost:5174', //对应的应用地址
    secretKey: '%Y&*FRTYGUHJIOKL', //对应的secretKey
    token: '', //token
    name: 'vue'
  }
};

const app = express();
app.use(cors());

// 设置cookie中间件
app.use(
  session({
    secret: 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7天
    }
  })
);

const generateToken = appId => {
  // 第一个参数是载荷 用来存储我们存的信息
  // 正常业务中这段代码是放在redis里面 由redis设置过期时间
  return jwt.sign(
    {
      appId
    },
    appToMapUrl[appId].secretKey
  );
};

// 打开页面就要调用登录接口
// 登录过直接返回token
app.get('/login', (req, res) => {
  // 表示已经登录
  if (req.session.username) {
    const appId = req.query.appId;
    let token;
    if (appToMapUrl[appId].token) {
      // 第一个应用走这边
      token = appToMapUrl[appId].token;
    } else {
      token = generateToken(appId);
      appToMapUrl[appId].token = token;
    }
    res.redirect(`${appToMapUrl[appId].url}?token=${token}`);
    return;
  }

  const html = fs.readFileSync('../sso.html', 'utf-8');
  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

app.get('/protected', (req, res) => {
  const { username, password, appId } = req.query;
  // 判断账户密码
  // 生成token
  const token = generateToken(appId);
  // 给这个对象存储token
  appToMapUrl[appId].token = token;
  // 存储一个标识证明已经登录过了
  req.session.username = username;
  const url = appToMapUrl[appId].url;
  res.redirect(`${url}?token=${token}}`);
});

app.listen(3000, () => {
  console.log('SSO服务启动成功');
});
