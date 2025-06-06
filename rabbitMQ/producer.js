import amqplib from 'amqplib';
import express from 'express';

// RabbitMQ 服务器地址（格式：amqp://用户名:密码@服务器IP:端口）
// const connection = await amqplib.connect('amqp://localhost:5672');
const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672');
const channel = await connection.createChannel();

const queue = 'task_queue';

const app = express();

app.get('/send', async (req, res) => {
  console.log(123456);

  const message = req.query.message || 'Hello, RabbitMQ!';
  const msgBuffer = Buffer.from(message);
  channel.sendToQueue(queue, msgBuffer, {
    persistent: true // 消息持久化 底层原理存入磁盘
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
