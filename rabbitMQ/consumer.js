import amqplib from 'amqplib';

const connection = await amqplib.connect('amqp://localhost:5672');
const channel = await connection.createChannel();

const queue = 'task_queue';

await channel.assertQueue(queue, {
  durable: true // 确保队列持久化
});

channel.consume(queue, msg => {
  if (msg !== null) {
    const message = msg.content.toString();
    console.log(`Received message: ${message}`);

    // 模拟处理消息
    setTimeout(() => {
      console.log(`Processed message: ${message}`);
      channel.ack(msg); // 确认消息已处理
    }, 1000);
  }
});
