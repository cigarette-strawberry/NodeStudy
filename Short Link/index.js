import express from 'express';
import knex from 'knex';
import shortid from 'shortid';

const db = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'short'
  }
});

const app = express();
app.use(express.json());

// !1.接口创建短码并且关联url
app.post('/create_url', async (req, res) => {
  const short_id = shortid.generate();
  await db('short').insert({
    short_id,
    url: req.body.url
  });
  res.send(`http://localhost:3000/${short_id}`);
});

// !2.根据短码获取url并进行重定向
app.get('/:short_id', async (req, res) => {
  const { short_id } = req.params;
  const url = await db('short').select('url').where({ short_id }).first();
  if (!url) {
    res.status(404).send('Not Found');
  } else {
    res.redirect(url.url);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
