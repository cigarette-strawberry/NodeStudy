import net from 'net';

const client = net.createConnection({
  host: 'localhost',
  port: 3000
});

client.on('data', data => {
  console.log(`Server: ${data.toString()}`);
});

setInterval(() => {
  client.write('Client');
}, 1000);
