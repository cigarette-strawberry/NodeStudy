import amqplib from 'amqplib';

// 1.连接MQ
const connection = await amqplib.connect('amqp://localhost:5672');

// 2.创建通道
const channel = await connection.createChannel();

// 3.创建交换机
// await channel.assertExchange('direct_exchange', 'direct', { durable: true });

// await channel.assertExchange('topic_exchange', 'topic', { durable: true });

// await channel.assertExchange('headers_exchange', 'headers', { durable: true });

await channel.assertExchange('fanout_exchange', 'fanout', { durable: true });

const queue = 'task_queue-2';

// 4.创建队列
await channel.assertQueue(queue, {
  durable: true // 确保队列持久化
});

// 5.绑定队列到交换机
/**
 * @param {string} queue 队列名称
 * @param {string} exchange 交换机名称
 * @param {string} routingKey 路由键
 */
// await channel.bindQueue(queue, 'direct_exchange', 'direct_routing_key');

// await channel.bindQueue(queue, 'topic_exchange', 'xw.*');

// await channel.bindQueue(queue, 'headers_exchange', '', {
//   name: 'xw'
// });

await channel.bindQueue(queue, 'fanout_exchange', '');

channel.consume(
  queue,
  msg => {
    if (msg !== null) {
      const message = msg.content.toString();
      console.log(`Received message: ${message}`);
    }
  },
  {
    noAck: true
  }
);
