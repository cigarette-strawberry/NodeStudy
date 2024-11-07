import express from 'express';

const router = express.Router();

router.get('/getList', (req, res) => {
  res.json({
    code: 200,
    message: '登录成功',
    data: [
      {
        a: 1
      }
    ]
  });
});

export default router;
