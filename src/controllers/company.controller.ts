import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ResponseUtil } from '../utils/response.util';
import { JwtAuthGuard } from 'src/guards';
import { User } from 'src/decorators';
import { CompanysService } from 'src/services';
import { RegisterCompanyDto, UpdateCompanyDto } from 'src/dtos/company';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companys')
@Controller('companys')
export class CompanyController {
  constructor(
    private readonly responseUtil: ResponseUtil,
    private readonly companysService: CompanysService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async infoJob(@Res() res: any, @User() user: any) {
    try {
      const result = await this.companysService.getInfoCompany(user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Post('/register')
  async register(
    @Body() body: RegisterCompanyDto,
    @Res() res: any,
    @User() user: any,
  ) {
    try {
      const result = await this.companysService.createCompanyOnlyOne(
        body,
        user,
      );
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Put('/update/:id')
  async update(
    @Body() body: UpdateCompanyDto,
    @Res() res: any,
    @User() user: any,
  ) {
    try {
      const result = await this.companysService.updateCompany(body, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }
}
