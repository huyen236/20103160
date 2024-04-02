import { Controller, Get, Req, Res } from '@nestjs/common';
import { HealthService } from '../services';
import { ResponseUtil } from '../utils/response.util';

@Controller('ping')
export class PingController {
  constructor(
    private readonly healthService: HealthService,
    private readonly responseUtil: ResponseUtil,
  ) {}

  @Get('')
  async ping(@Req() req: any, @Res() res: any) {
    const result = await this.healthService.ping();
    return this.responseUtil.success({ res, data: result });
  }
}
