import net from 'net';

const server = net.createServer(socket => {
  setInterval(() => {
    socket.write(`Server`);
  }, 1000);

  socket.on('data', data => {
    console.log(`Client: ${data.toString()}`);
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
