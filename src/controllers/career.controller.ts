import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CareersService } from '../services';
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { CreateCareerDto } from 'src/dtos';

@Controller('careers')
export class CareerController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly careersService: CareersService,
  ) { }

  @Post('/create')
  async create(@Body() body: CreateCareerDto, @Res() res: any) {
    try {
      const result = await this.careersService.createCareer(body);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async listJob(@Res() res: any) {
    try {
      const result = await this.careersService.getListCareer();
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }
}
