import {
  Controller,
  Get,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StatisticService } from '../services';
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/decorators';
import { ApplyJobStatisticDto, approvalJobStatisticDto } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('statistic')
@Controller('statistic')
export class StatisticController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly statisticService: StatisticService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/apply-job')
  async applyJob(@Query() query: ApplyJobStatisticDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.statisticService.applyJobByTimeStatistic(query);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/job')
  async job(@Query() query: approvalJobStatisticDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.statisticService.jobStatistic(query);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/approval-job')
  async approvalJob(@Query() query: approvalJobStatisticDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.statisticService.userJobApprovalStatistic(query, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/admin/approval-job') 
  async adminApprovalJob(@Query() query: approvalJobStatisticDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.statisticService.adminJobApprovalStatistic(query, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }
}
