import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import { PrismaClient } from '@prisma/client';
import { PrismaDB } from './src/db';
import express from 'express';

import { JWT } from './src/jwt';

import { User } from './src/user/controller';
import { UserService } from './src/user/services';

const container = new Container();

// PrismaClient
container.bind<PrismaClient>(PrismaClient).toFactory(() => {
  return () => new PrismaClient();
});
container.bind<PrismaDB>(PrismaDB).to(PrismaDB);

// JWT
container.bind<JWT>(JWT).to(JWT);

// User模块
container.bind<User>(User).to(User);
container.bind<UserService>(UserService).to(UserService);

const server = new InversifyExpressServer(container);
// 所有的中间键 都在这个地方
server.setConfig(app => {
  app.use(express.json());
  app.use(container.get(JWT).init());
});
const app = server.build();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

declare global {
  namespace Express {
    interface Request {
      user?: {
        name: string;
        email: string;
        // 根据实际 JWT 载荷结构定义
      };
    }
  }
}
