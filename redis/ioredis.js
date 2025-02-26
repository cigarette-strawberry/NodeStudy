import { Redis } from 'ioredis';

const redis = new Redis({
  host: '127.0.0.1',
  port: 6379,
  password: ''
});

const redis2 = new Redis({
  host: '127.0.0.1',
  port: 6378,
  password: ''
});

redis.subscribe('test');
redis.on('message', (channel, message) => {
  console.log(`channel: ${channel}, message: ${message}`);
});
redis2.publish('test');

// 字符串|数字
redis.set('A', 123);
redis.get('A').then(console.log);
redis.setex('B', 10, 456);

// 集合
redis.sadd('C', 1, 2, 3, 4, 5, 1, 2, 3, 4, 5);
redis.srem('C', 1, 5);
redis.smembers('C').then(console.log);
redis.sismember('C', 2).then(console.log);

// 哈希
redis.hset('D', 'name', '张三');
redis.hset('D', 'age', 18);
redis.hdel('D', 'name');
redis.hget('D', 'name').then(console.log);
redis.hgetall('D').then(console.log);

// 列表
redis.lpush('E', 1, 2, 3);
redis.rpush('E', 4, 5, 6);
redis.llen('E').then(console.log);
redis.lrange('E', 0, -1).then(console.log);
redis.lrem('E', 0, 1).then(console.log);
