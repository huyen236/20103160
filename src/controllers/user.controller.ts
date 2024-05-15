import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { HealthService, UsersService } from '../services';
import { ResponseUtil } from '../utils/response.util';
import { User } from 'src/decorators';
import { LoginDto } from 'src/dtos/login.dto';
import { RegisterDto, UpdateUserDto } from 'src/dtos';
import { ChangePassDto } from 'src/dtos/user';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly healthService: HealthService,
    private readonly responseUtil: ResponseUtil,
    private readonly usersService: UsersService,
  ) {}

  @Get('/:id')
  async infoUser(@Param('id') id: string, @Res() res: any, @User() user: any) {
    try {
      const result = await this.usersService.getUser(id, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: any) {
    try {
      const result = await this.usersService.login(body);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Post('/logout')
  async logout(@Res() res: any, @User() user: any) {
    try {
      const result = await this.usersService.logout(user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Post('/register')
  async register(@Body() body: RegisterDto, @Res() res: any) {
    try {
      const result = await this.usersService.register(body);
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
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
    @Res() res: any,
    @User() user: any,
  ) {
    try {
      const result = await this.usersService.updateInfoUser(body, id, user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Get('/forgot-password/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: any) {
    try {
      const result = await this.usersService.ForgotPassword(email);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Put('/change-password/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePassDto,
    @Res() res: any,
  ) {
    try {
      const result = await this.usersService.changePasswordApp(body, id);
      // @ts-ignore
      return this.responseUtil.success({ res, data: result._doc });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Get('/change-pass-mail/:id')
  async changePassEmail(@Param('id') id: string, @Res() res: any) {
    try {
      const result = await this.usersService.changeP(id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }

  @Get('/active-user/:email')
  async active(@Param('email') email: string, @Res() res: any) {
    try {
      const result = await this.usersService.activeUser(email);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send({
        status: 'failed',
        message: error.message,
      });
    }
  }
}
