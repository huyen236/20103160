import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { HealthService, UsersService } from '../services';
import { ResponseUtil } from '../utils/response.util';

@Controller('users')
export class UserController {
  constructor(
    private readonly healthService: HealthService,
    private readonly responseUtil: ResponseUtil,
    private readonly usersService:UsersService
  ) {}

  @Get('/info')
  async ping(@Req() req: any, @Res() res: any) {
    const result = await this.healthService.ping();
    return this.responseUtil.success({ res, data: result });
  }

  @Post('/login')
  async login(@Body() body: any,  @Res() res: any){
    const result = await this.usersService.login(body);
    return this.responseUtil.success({ res, data: result });
  }
}
