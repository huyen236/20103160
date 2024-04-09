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
import { JobMappingService } from 'src/services/job-mapping.service';
import { ApplyCVDto } from 'src/dtos';

@Controller('job-mapping')
export class JobMappingController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly jobMappingService: JobMappingService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('')
  async infoJob(@Body() body: any, @Res() res: any, @User() user: any) {
    try {
      const result = await this.jobMappingService.getListJobApply(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }

  @Post('/applyCV')
  async apply(@Body() body: ApplyCVDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.jobMappingService.applyCV(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }

  @Post('/approvalCV')
  async approval(@Body() body: any, @Res() res: any, @User() user: any) {
    try {
      const result = await this.jobMappingService.approvalCV(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }
}
