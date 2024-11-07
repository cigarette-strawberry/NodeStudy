import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.json({
    code: 200,
    message: '登录成功'
  });
});

export default router;
