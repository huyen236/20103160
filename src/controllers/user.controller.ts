import { Controller, Get, Req, Res } from '@nestjs/common';
import { HealthService } from '../services';
import { ResponseUtil } from '../utils/response.util';

@Controller('users')
export class UserController {
  constructor(
    private readonly healthService: HealthService,
    private readonly responseUtil: ResponseUtil,
  ) {}

  @Get('/info')
  async ping(@Req() req: any, @Res() res: any) {
    const result = await this.healthService.ping();
    return this.responseUtil.success({ res, data: result });
  }
}
