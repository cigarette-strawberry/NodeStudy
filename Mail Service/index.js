const yaml = require('js-yaml');
const nodemailer = require('nodemailer');
const fs = require('node:fs');
const url = require('node:url');
const http = require('node:http');

const config = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'));

const transport = nodemailer.createTransport({
  service: 'qq',
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: config.user,
    pass: config.pass
  }
});

http
  .createServer((req, res) => {
    const { pathname } = url.parse(req.url, true);
    const { method } = req;
    if (method === 'POST' && pathname === '/send-email') {
      let data = '';
      req.on('data', chunk => {
        data += chunk;
      });
      req.on('end', () => {
        const { to, subject, text } = JSON.parse(data);
        // 发送邮件
        transport.sendMail({
          from: config.user, // 发件人
          to, // 收件人
          subject, // 主题
          text // 内容
        });
        res.end('Email sent successfully');
      });
    }
  })
  .listen(3000, () => {
    console.log('Server started on port 3000');
  });
