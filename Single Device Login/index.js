import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors);

const server = app.listen(3000, () => {
  console.log('3000端口已启动');
});

// 初始化ws
const connection = {};
const wss = new WebSocketServer({ server });
wss.on('connection', ws => {
  // socket 传输的时候只能是字符串 或者 buffer 前端传输的时候 JSON.stringify
  // 需要传递 {id:1, fingerprint:'qbwdib', action:'login'}
  ws.on('message', message => {
    const data = JSON.parse(message);
    if (data.action === 'login') {
      if (connection[data.id] && connection[data.id].fingerprint) {
        console.log('新设备登录 弹出提示');
        connection[data.id].socket.send(
          JSON.stringify({
            action: 'logout',
            message: `您与${new Date().toLocaleString()}在其他设备登录`
          })
        );
        connection[data.id].socket.close();
        connection[data.id].socket = ws;
      } else {
        console.log('第一次登录 存储信息');
        connection[data.id] = {
          socket: ws,
          fingerprint: data.fingerprint
        };
      }
    }
  });
});
