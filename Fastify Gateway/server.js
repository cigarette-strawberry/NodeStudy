import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the Express server!' + process.argv[2]);
});

app.get('/api', (req, res) => {
  res.send('Hello from the Express server!' + process.argv[2]);
});

app.listen(process.argv[2], () => {
  console.log('Server is running on http://localhost:' + process.argv[2]);
});
