import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app' // 客户端标识
  // brokers: ['localhost:9092'] // Kafka broker 地址
});

// 创建生产者
const producer = kafka.producer();

// 连接服务器
await producer.connect();

// 发送消息
await producer.send({
  topic: 'test-topic', // 主题名称
  messages: [
    { value: 'Hello KafkaJS user!' }, // 消息内容
    { value: Buffer.from('Another message') } // 另一条消息
  ]
});

// 断开连接
await producer.disconnect();
