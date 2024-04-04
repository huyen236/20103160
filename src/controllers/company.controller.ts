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
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/decorators';
import { CompanysService } from 'src/services';

@Controller('companys')
export class CompanyController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly companysService: CompanysService,
  ) {}

  // truyen token . chua lam phan quyen
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async infoJob(@Param('id') id: string, @Res() res: any, @User() user: any) {
    // const result = await this.JobsService.getUser(id);
    // return this.responseUtil.success({ res, data: result });
  }
}
