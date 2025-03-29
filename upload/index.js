import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

// 1、初始化
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.index}-${req.body.filename}`);
  }
});

const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('ok');
});

app.post('/merge', (req, res) => {
  // 1、读取里面所有的切片
  const uploadDir = path.join(process.cwd(), 'uploads');

  const dirs = fs.readdirSync(uploadDir);

  // 2、排序
  dirs.sort((a, b) => a.split('-')[0] - b.split('-')[0]);

  // 3、合并
  const filePath = path.join(process.cwd(), 'files', req.body.filename);
  dirs.forEach(dir => {
    // 读取文件
    const file = fs.readFileSync(path.join(uploadDir, dir));
    // 合并文件
    fs.appendFileSync(filePath, file);
    // 删除文件
    fs.unlinkSync(path.join(uploadDir, dir));
  });

  res.send('ok');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
