import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { JobsService } from '../services';
import { ResponseUtil } from '../utils/response.util';
import { User } from 'src/decorators';
import { CreateJobDto } from 'src/dtos/job/create-job.dto';
import { GetListJobDto } from 'src/dtos';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly jobsService: JobsService,
  ) {}
  @Get('/:id')
  async infoJob(@Param('id') id: string, @Res() res: any) {
    try {
      const result = await this.jobsService.getDetailJob(id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Post('/create')
  async create(@Body() body: CreateJobDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.jobsService.createJob(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Get('')
  async listJob(@Body() body: GetListJobDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.jobsService.getListJobs(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }
}
