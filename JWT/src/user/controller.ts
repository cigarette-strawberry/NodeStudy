import { controller, httpGet as Get, httpPost as Post, httpPut as Put, httpDelete as Delete } from 'inversify-express-utils';
import { inject } from 'inversify';
import type { Request, Response } from 'express';
import { UserService } from './services';
import { JWT } from '../jwt';

@controller('/user')
export class User {
  constructor(@inject(UserService) private readonly UserService: UserService) {}
  @Get('/get', JWT.middleware())
  public async getUser(req: Request, res: Response) {
    console.log(req.user);

    let result = await this.UserService.getUser();
    res.send(result);

    res.send(req.user);
  }

  @Post('/create')
  public async createUser(req: Request, res: Response) {
    let result = await this.UserService.createUser(req.body);
    res.send(result);
  }

  @Put('/update')
  public async updateUser(req: Request, res: Response) {
    let result = await this.UserService.updateUser(req.body);
    res.send(result);
  }

  @Delete('/delete')
  public async deleteUser(req: Request, res: Response) {
    let result = await this.UserService.deleteUser(req.body);
    res.send(result);
  }

  @Post('/login')
  public login(req: Request, res: Response) {
    let result = this.UserService.login(req.body);
    res.send(result);
  }
}
