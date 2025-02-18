import fs from 'node:fs';
import jsyaml from 'js-yaml';
import express from 'express';
import knex from 'knex';
const yaml = fs.readFileSync('./db.config.yaml', 'utf8');
const config = jsyaml.load(yaml);

const db = knex({
  client: 'mysql2',
  connection: config.db
});

const tableName = 'list';
const tableExists = db.schema.hasTable(tableName);
if (!tableExists) {
  db.schema
    .createTable('list', table => {
      table.increments('id'); // id 自增 主键
      table.string('name');
      table.integer('age');
      table.string('hobby');
      table.timestamps(true, true); // 创建时间 更新时间
    })
    .then(() => {
      console.log('table created');
    });
}

const app = express();
// 支持post
app.use(express.json());

app.get('/', async (req, res) => {
  const data = await db('list').select().orderBy('id', 'desc');
  //   const [data] = await sql.query('select * from user');
  const count = await db('list').count('* as total');

  // sql
  /* db.raw('select * from list').then(data => {
    console.log(data);
  }); */

  // 连表
  const table = await db('user').select().leftJoin('book', 'user.id', 'book.user_id');
  res.json({
    data,
    table,
    count: count[0].total,
    sql: db('list').select().toSQL().sql // 生成sql语句
  });
});

app.get('/user/:id', async (req, res) => {
  const data = await db('list').select().where({ id: req.params.id });
  //   const [data] = await sql.query('select * from user where id = ?', [req.params.id]);
  res.send(data);
});

app.post('/create', async (req, res) => {
  const { name, age, hobby } = req.body;
  await db('list').insert({ name, age, hobby });
  //   await sql.query('insert into user(name, age, address, hobby, sex) values(?,?,?,?,?)', [name, age, address, hobby, sex]);
  res.send('create ok');
});

app.put('/update', async (req, res) => {
  const { name, age, hobby, id } = req.body;
  await db('list').update({ name, age, hobby }).where({ id });
  //   await sql.query('update user set name=?, age=?, address=?, hobby=?, sex=? where id = ?', [name, age, address, hobby, sex, id]);
  res.send('update ok');
});

app.delete('/delete', async (req, res) => {
  await db('list').delete().where({ id: req.body.id });
  //   await sql.query('delete from user where id = ?', [req.body.id]);
  res.send('delete ok');
});

/**
 * 事物
 *  A减去 100 sql1
 *  B增加 100 sql2
 *  保持原子的一致性
 */
db.transaction(async trx => {
  try {
    await trx('list').update({ money: -100 }).where({ id: 1 }); // A sql1
    await trx('list').update({ money: +100 }).where({ id: 2 }); // B sql2
    await trx.commit(); // 提交事物
  } catch {
    trx.rollback(); // 回滚事物
  }
})
  .then(() => {})
  .catch(err => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log('port' + 3000);
});
