import fastify from 'fastify';

// 日志插件 logger: true
const app = fastify({
  logger: true
});

// cjs commonjs require('@fastify/mysql')
// esm ESModule import('@fastify/mysql')
app.register(import('@fastify/mysql'), {
  connectionString: 'mysql://root@localhost/mysql'
});

app.post('/add', async (req, reply) => {
  app.mysql.query('INSERT INTO User (name, email) VALUES (?, ?)', [req.body.name, req.body.email], function (err, result) {
    if (err) {
      reply.send(err);
    } else {
      reply.send(result);
    }
  });
});

app.listen({ port: 3000 }).then(() => {
  console.log('server start');
});
