import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
const port = 3000;
app.use(express.json()); // 支持post

app.get('/', async (req, res) => {
  const data = await prisma.user.findMany({
    include: {
      Articles: true
    }
  });
  res.send(data);
});

app.get('/user/:id', async (req, res) => {
  const data = await prisma.user.findMany({
    where: {
      id: Number(req.params.id)
    }
  });
  res.send(data);
});

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

app.put('/update', async (req, res) => {
  const { name, email, id } = req.body;
  const data = await prisma.user.update({
    data: {
      name,
      email
    },
    where: {
      id: Number(id)
    }
  });
  res.send(data);
});

app.delete('/delete', async (req, res) => {
  await prisma.article.deleteMany({
    where: {
      authorId: Number(req.body.id)
    }
  });
  const data = await prisma.user.delete({
    where: {
      id: Number(req.body.id)
    }
  });
  res.send(data);
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
