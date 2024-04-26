import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/decorators';
import { CompanysService } from 'src/services';
import { RegisterCompanyDto, UpdateCompanyDto } from 'src/dtos/company';

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
    try {
      const result = await this.companysService.getInfoCompany(id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }

  @Post('/register')
  async register(@Body() body: RegisterCompanyDto, @Res() res: any, @User() user: any) {
    try {
      const result = await this.companysService.createCompanyOnlyOne(
        body,
        user,
      );
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }

  @Put('/update/:id')
  async update(@Body() body: UpdateCompanyDto, @Param('id') id: string, @Res() res: any) {
    try {
      const result = await this.companysService.updateCompany(body, id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message:error.message
      });
    }
  }
}
