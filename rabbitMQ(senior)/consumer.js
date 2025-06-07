import amqplib from 'amqplib';

// 1.连接MQ
// const connection = await amqplib.connect('amqp://localhost:5672');
const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672');

// 2.创建通道
const channel = await connection.createChannel();

// 3.创建交换机
const queue = 'task_queue';

await channel.assertExchange(queue, 'x-delayed-message', {
  durable: true,
  arguments: {
    'x-delayed-type': 'direct' // 设置交换机类型为 direct
  }
});

// 4.创建队列
await channel.assertQueue(queue);

// 5.绑定队列
channel.bindQueue(queue, queue, 'direct');

channel.consume(
  queue,
  msg => {
    if (msg !== null) {
      const message = msg.content.toString();
      console.log(`Received message: ${message}`);
    }
  },
  {
    noAck: true // 自动确认消息
  }
);
