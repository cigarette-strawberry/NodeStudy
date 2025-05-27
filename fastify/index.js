import fastify from 'fastify';

// 日志插件 logger: true
const app = fastify({
  logger: true
});

// 给前端返回值 使用 reply.send 或者 直接return
// 没有 reply.json 用法
app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

// 天然支持post
// post request.body
// get request.query
// 动态参数 request.params
app.post('/send', async (request, reply) => {
  console.log(request.body, request.query, request.params);
  reply.send({ hello: 'world' });
});

// 路由
app.route({
  url: '/test', // 请求路径
  method: 'POST', // 请求方式

  // 序列化入参和出参
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number' }
      },
      required: ['name', 'age']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          code: { type: 'number' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              age: { type: 'number' }
            }
          }
        }
      }
    }
  },

  handler: async (request, reply) => {
    console.log(request.body, request.query, request.params);
    const { name, age } = request.body;
    console.log('🚀 ~ handler: ~ name, age:', name, age);

    reply.send({
      code: 200,
      message: 'success',
      data: {
        name,
        age
      }
    });
  }
});

// 插件
app.register(function (instance, opts, done) {
  instance.decorate('add', (a, b) => a + b);
  const c = instance.add(1, 2);
  console.log('🚀 ~ c:', c);

  // done === next
  done();
});

app.listen({ port: 3000 }).then(() => {
  console.log('server start');
});
