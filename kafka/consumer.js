import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'my-app' // 客户端标识
  // brokers: ['localhost:9092'] // Kafka broker 地址
});

// 创建消费者
const consumer = kafka.consumer({ groupId: 'test-group' });

try {
  // 连接服务器
  await consumer.connect();

  // 订阅主题 fromBeginning 为true表示从头开始消费 为false表示从最新消息开始消费
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // 处理消息
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()} from topic: ${topic}, partition: ${partition}`);
    }
  });
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
