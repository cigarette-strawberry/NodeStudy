import express from 'express';
import jsw from 'jsonwebtoken';
import qrcode from 'qrcode';

// mandate.html 授权页面
// qrcode.html 展示二维码 和 状态的页面

const app = express();
let user = {},
  userId = 1;
app.use('/static', express.static('public'));

// 1.生成二维码 并且初始化数据结构
app.get('/qrcode', async (req, res) => {
  user[userId] = {
    token: null, // 登录凭证 默认为空
    time: Date.now() // 过期时间 用来判断
  };

  // 生成二维码
  const code = await qrcode.toDataURL(`http://192.168.0.76:3000/static/mandate.html?userId=${userId}`);
  res.json({
    code,
    userId
  });
});

// 2.登录授权 返回token 更状态 为1已授权
app.post('/login/:userId', (req, res) => {
  const { userId } = req.params;

  // 生成token
  const token = jsw.sign({ id: userId }, 'secret', { expiresIn: '1h' });

  user[userId].token = token;
  user[userId].time = Date.now();

  res.json({
    token
  });
});

// 3.检查二维码的状态 0默认值未授权 1已授权 2已过期
app.get('/check/:userId', (req, res) => {
  const { userId } = req.params;
  if (Date.now() - user[userId].time > 1000 * 60 * 1) {
    res.json({
      status: 2
    });
  } else if (user[userId].token) {
    res.json({
      status: 1
    });
  } else {
    res.json({
      status: 0
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
