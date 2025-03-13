import net from 'net';

const html = `<h1>TCP NET</h1>`;

const responseHeader = ['HTTP/1.1 200 OK', 'Content-Type: text/html', 'Content-Length: ' + html.length, '\r\n', html];

const http = net.createServer(socket => {
  socket.on('data', data => {
    if (data.toString().includes('GET /')) {
      socket.write(responseHeader.join('\r\n'));
      socket.end();
    }
  });
});

http.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
