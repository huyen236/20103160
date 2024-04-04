import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HealthService, JobsService, UsersService } from '../services';
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/decorators';

@Controller('jobs')
export class JobController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly jobsService: JobsService,
  ) {}

  // truyen token . chua lam phan quyen
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async infoJob(@Param('id') id: string, @Res() res: any, @User() user: any) {
    // const result = await this.JobsService.getUser(id);
    // return this.responseUtil.success({ res, data: result });
  }
}
