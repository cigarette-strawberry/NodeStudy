import amqplib from 'amqplib';

// 1.连接MQ
// const connection = await amqplib.connect('amqp://localhost:5672');
const connection = await amqplib.connect('amqp://rabbitmq:rabbitmq@localhost:5672');

// 2.创建通道
const channel = await connection.createChannel();

// 3.创建交换机
/**
 * @param {string} exchange 交换机名称
 * @param {string} type 交换机类型 "direct" | "topic" | "headers" | "fanout"
 * @param {object} options 交换机选项
 */
// await channel.assertExchange('direct_exchange', 'direct', { durable: true });

// await channel.assertExchange('topic_exchange', 'topic', { durable: true });

// await channel.assertExchange('headers_exchange', 'headers', { durable: true });

await channel.assertExchange('fanout_exchange', 'fanout', { durable: true });

// 4.发送消息
/**
 * @params {string} exchange 交换机名称 (发送)
 * @params {string} routingKey 路由键 (匹配)
 * @param {Buffer} content 消息内容
 * @param {object} options.headers 消息头部 (headers交换机使用)
 */
// channel.publish('direct_exchange', 'direct_routing_key', Buffer.from('Hello, direct, RabbitMQ!'));

// channel.publish('topic_exchange', 'xw.topic_routing_key', Buffer.from('Hello, topic, RabbitMQ!'));

// channel.publish('headers_exchange', '', Buffer.from('Hello, headers, RabbitMQ!'), {
//   headers: {
//     name: 'xw'
//   }
// });

channel.publish('fanout_exchange', '', Buffer.from('Hello, fanout, RabbitMQ!'));

await channel.close();
await connection.close();
process.exit(0); // 退出进程
