process.on('message', (message, sendHandle) => {
  console.log(message);
  process.send('我是子进程：收到收到');
});
