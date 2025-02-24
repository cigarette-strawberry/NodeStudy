import { controller, httpGet as Get, httpPost as Post, httpPut as Put, httpDelete as Delete } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import { UserService } from './services';

@controller('/user')
export class User {
  constructor(@inject(UserService) private readonly UserService: UserService) {}
  @Get('/get')
  public async getUser(req: Request, res: Response) {
    let result = await this.UserService.getUser();
    res.send(result);
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
}
