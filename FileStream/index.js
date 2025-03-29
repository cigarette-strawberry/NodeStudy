import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';

const app = express();
app.use(cors());
app.use(express.json());

// console.log(console.log(path.join(process.cwd(), '../upload/files')));

app.post('/download', (req, res) => {
  const filename = req.body.filename;
  const filepath = path.join(process.cwd(), '../upload/files', filename);
  const file = fs.readFileSync(filepath);
  // 两个响应头
  // Content-Type: octet-stream 二进制流
  // Content-Disposition: 网页里面打开图片默认是 inline 预览而不是下载 设置 attachment 会当作一个附件去进行下载
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.send(file);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
