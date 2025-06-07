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

// 4.发送消息
channel.publish(queue, 'direct', Buffer.from('Hello, x-delayed-message, RabbitMQ!'), {
  headers: {
    'x-delay': 5000 // 设置延迟时间为5000毫秒
  }
});

await channel.close();
await connection.close();
process.exit(0); // 退出进程
