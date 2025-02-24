import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaDB {
  prisma: PrismaClient;
  constructor(@inject(PrismaClient) private readonly PrismaClient: () => PrismaClient) {
    this.prisma = PrismaClient();
  }
}
