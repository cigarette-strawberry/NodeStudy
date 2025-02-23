import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(express.json()); // 支持post

/* app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
}); */

app.post('/create', async (req, res) => {
  const { name, email } = req.body;
  const data = await prisma.user.create({
    data: {
      name,
      email,
      Articles: {
        // 添加单个使用对象
        /* create: {
          title: 'Hello World',
          content: 'Hello World'
        } */
        // 添加单个使用数组
        create: [
          {
            title: 'cigarette',
            content: 'Hello cigarette'
          },
          {
            title: 'strawberry',
            content: 'Hello strawberry'
          }
        ]
      }
    }
  });
  res.send(data);
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
