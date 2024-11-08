const express = require('express');

const app = express();

const whiteList = ['localhost'];
const preventHotLinking = (req, res, next) => {
  const referer = req.get('referer');
  if (referer) {
    const { hostname } = new URL(referer);
    if (!whiteList.includes(hostname)) {
      res.status(403).send('Forbidden');
      return;
    }
  }
  next();
};

app.use(preventHotLinking);
// 初始化静态资源
// app.use(express.static('static'));
app.use('/assets', express.static('static'));

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
