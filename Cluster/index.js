import os from 'node:os';
import cluster from 'node:cluster';
import http from 'node:http';

console.log(os.cpus().length); // 输出 CPU 核心数

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  // 主进程
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // 子进程
  // Workers can share any TCP connection.
  // In this case, it is an HTTP server.
  console.log(`Worker ${process.pid} started`);
  http
    .createServer((req, res) => {
      res.writeHead(200);
      res.end('Hello World\n');
    })
    .listen(8000, () => {
      console.log(`Worker ${process.pid} is listening on port 8000`);
    });
}
