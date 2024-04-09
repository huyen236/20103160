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

@Controller('users')
export class UserController {
  constructor(
    private readonly healthService: HealthService,
    private readonly responseUtil: ResponseUtil,
    private readonly usersService: UsersService,
  ) {}

  // truyen token . chua lam phan quyen
  @Get('/:id')
  async infoUser(@Param('id') id: string, @Res() res: any) {
    try {
      const result = await this.usersService.getUser(id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: any) {
    try {
      const result = await this.usersService.login(body);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Post('/logout')
  async logout(@Res() res: any, @User() user: any) {
    try {
      const result = await this.usersService.logout(user);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Post('/register')
  async register(@Body() body: RegisterDto, @Res() res: any) {
    try {
      const result = await this.usersService.register(body);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Put('/update/:id')
  async update(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
    @Res() res: any,
  ) {
    try {
      const result = await this.usersService.updateInfoUser(body, id);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Get('/forgot-password/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: any) {
    try {
      const result = await this.usersService.ForgotPassword(email);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }

  @Put('/change-password')
  async changePassword(@Body() body: any, @Res() res: any) {
    try {
      const result = await this.usersService.changePasswordApp(body);
      return this.responseUtil.success({ res, data: result });
    } catch (error) {
      return res.status(422).send(error.message);
    }
  }
}
