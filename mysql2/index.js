import mysql2 from 'mysql2/promise';
import fs from 'node:fs';
import jsyaml from 'js-yaml';
import express from 'express';
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml);
const sql = await mysql2.createConnection(config.db);

const app = express();
// 支持post
app.use(express.json());

app.get('/', async (req, res) => {
  const [data] = await sql.query('select * from user');
  res.send(data);
});

app.get('/user/:id', async (req, res) => {
  const [data] = await sql.query('select * from user where id = ?', [req.params.id]);
  res.send(data);
});

app.post('/create', async (req, res) => {
  const { name, age, address, hobby, sex } = req.body;
  await sql.query('insert into user(name, age, address, hobby, sex) values(?,?,?,?,?)', [name, age, address, hobby, sex]);
  res.send('create ok');
});

app.put('/update', async (req, res) => {
  const { name, age, address, hobby, sex, id } = req.body;
  await sql.query('update user set name=?, age=?, address=?, hobby=?, sex=? where id = ?', [name, age, address, hobby, sex, id]);
  res.send('update ok');
});

app.delete('/delete', async (req, res) => {
  await sql.query('delete from user where id = ?', [req.body.id]);
  res.send('delete ok');
});

app.listen(3000, () => {
  console.log('port' + 3000);
});
