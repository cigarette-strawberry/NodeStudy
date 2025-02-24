import { injectable, inject } from 'inversify';
import { PrismaDB } from '../db';
import { UserDTO } from './user.dto.ts';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@injectable()
export class UserService {
  constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {}
  public async getUser() {
    return await this.PrismaDB.prisma.user.findMany();
  }

  public async createUser(user: UserDTO) {
    let userDTo = plainToClass(UserDTO, user);
    let errors = await validate(userDTo);
    if (errors.length > 0) return errors;
    return await this.PrismaDB.prisma.user.create({ data: user });
  }

  public async updateUser(user: any) {
    return await this.PrismaDB.prisma.user.update({
      where: { id: Number(user.id) },
      data: user
    });
  }

  public async deleteUser(user: any) {
    return await this.PrismaDB.prisma.user.delete({
      where: { id: Number(user.id) }
    });
  }
}
