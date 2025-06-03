import fastify from 'fastify';
import proxy from '@fastify/http-proxy'; //负载代理技术
import rateLimit from '@fastify/rate-limit'; //限流技术
import { proxyConfig } from './proxy/index.js'; //请往下翻
import caching from '@fastify/caching'; //缓存技术
import CircuitBreaker from 'opossum'; //熔断技术
import { rateLimitConfig, cachingConfig, breakerConfig } from './config/index.js'; //配置项

const app = fastify({
  logger: false
});

app.register(rateLimit, rateLimitConfig);

app.register(caching, cachingConfig);

// 第一个参数是回调函数 要求返回promise
// 第二个参数是配置项
const circuitBreaker = new CircuitBreaker(url => {
  // 这里可以添加熔断逻辑
  // 比如检查服务是否可用，或者请求失败次数等
  return fetch(url); //检测服务是否挂掉;
}, breakerConfig);

proxyConfig.forEach(item => {
  app.register(proxy, {
    ...item,
    preHandler: (request, reply, done) => {
      // 使用熔断器来处理请求
      circuitBreaker
        .fire(item.upstream)
        .then(response => {
          reply.send(response);
        })
        .catch(error => {
          // 服务断掉时进行故障转移
          /**
           * 在这里编写代码
           * */
          reply.code(503).send({ error: 'Service Unavailable', message: error.message });
        });
      done();
    }
  });
});

app.listen({ port: 3000 }).then(() => {
  console.log('Fastify Gateway is running on http://localhost:3000');
});
