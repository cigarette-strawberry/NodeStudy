import http from 'node:http';
import { Server } from 'socket.io';

const server = http.createServer();

const io = new Server(server, {
  cors: true // 允许跨域
});

// 事件模型驱动
const groupMap = {};

/**
 * {
 *  1:[{name,room,id},{name,room,id}]
 *  2:[{name,room,id}]
 *  3:[]
 * }
 */

io.on('connection', socket => {
  /**
   * 1.加入房间 name姓名 roomId房间 id
   * 2.组装数据格式
   */

  socket.on('join', ({ name, room }) => {
    socket.join(room); // 创建房间
    if (groupMap[room]) {
      groupMap[room].push({ name, room, id: socket.id }); // 存在房间push人员
    } else {
      groupMap[room] = [{ name, room, id: socket.id }]; // 不存在房间创建
    }

    socket.emit('groupMap', groupMap);
    socket.broadcast.emit('groupMap', groupMap); // 所有人都能看到

    // 管理员发送消息
    socket.broadcast.to(room).emit('message', {
      name: '管理员',
      message: `欢迎${name}加入聊天室`
    });
  });

  socket.on('message', ({ name, message, room }) => {
    socket.broadcast.to(room).emit('message', { name, message });
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
