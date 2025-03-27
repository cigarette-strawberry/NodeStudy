import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

// 1、初始化
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(process.cwd(), 'uploads/'));
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.index}-${req.body.filename}`);
  }
});

// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });
const http = express();

http.use(cors());
http.use(express.json());

http.post('/upload', upload.single('file'), (req, res) => {
  res.send('ok');
});

http.listen(3000, () => {
  console.log('listening on port 3000');
});
