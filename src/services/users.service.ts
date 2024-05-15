import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IUserDocument, IUserSessionDocument } from 'src/interfaces';
import { SendMailService } from './send-mail.service';
import { LoginDto } from 'src/dtos/login.dto';
import { RegisterDto, UpdateUserDto } from 'src/dtos';
import { ChangePassDto } from 'src/dtos/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    @InjectModel('user-session')
    private readonly userSessionModel: Model<IUserSessionDocument>,
    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService,
  ) { }
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // login vo app va tao token. decorde token se thay duoc nhung thong so can thiet
  async login(body: LoginDto) {
    const { email, password } = body;
    const checkLogin = await this.userModel
      .findOne({
        email,
        password,
      })
      .lean();
    if (!checkLogin) {
      throw new Error('sai email hoac password');
    }

    const payload = {
      email,
      _id: checkLogin._id,
      phone: checkLogin.phone,
      id: checkLogin._id,
      is_admin: checkLogin.is_admin,
    };
    const login_time = Date.now();
    await this.userSessionModel.create({
      login_time,
      expire_time: 3600,
      user_id: checkLogin._id,
      is_active: true,
    });
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'your_secret_key',
        expiresIn: 3600,
      }),
    };
  }

  async logout(user: any) {
    const login_out = Date.now();
    return await this.userSessionModel.updateOne(
      {
        user_id: user._id,
      },
      {
        login_out,
        is_active: false,
      },
    );
  }

  async getUser(id: string, userInfo: any) {
    if (userInfo?._id !== id) {
      throw new Error('ban khong co quyen truy cap thong tin');
    }
    const user = await this.userModel
      .findOne({
        _id: id,
      })
      .lean();
    if (!user) {
      throw new Error('user khong ton tai');
    }
    return user;
  }

  async register(body: RegisterDto) {
    const { email, phone, name, password, address, is_admin } = body;
    const checkEmail = await this.userModel
      .findOne({
        email,
      })
      .lean();
    if (checkEmail) {
      throw new Error('email da duoc dang ki');
    }
    const result = await this.userModel.create({
      name,
      email,
      password,
      phone,
      address,
      is_admin
    });
    // @ts-ignore
    return result.docs;
  }

  async updateInfoUser(body: UpdateUserDto, id: string, userInfo: any) {
    if (userInfo?._id !== id) {
      throw new Error('ban khong co quyen truy cap thong tin');
    }
    const {
      gender,
      skill,
      experience,
      description_job,
      specialized,
      industry,
      province,
      name,
      phone,
      address,
    } = body;
    const checkUser = await this.userModel
      .findOne({
        _id: id,
      })
      .lean();
    if (!checkUser) {
      throw new Error('user khong ton tai');
    }
    const dataUpdate = {
      gender,
      skill,
      experience,
      description_job,
      specialized,
      industry,
      province,
      name,
      phone,
      address,
    };
    return this.userModel.updateOne(
      {
        _id: id,
      },
      dataUpdate,
    );
  }


  async ForgotPassword(email: string) {
    const checkMail = await this.userModel.findOne({
      email,
    });
    if (!checkMail) {
      throw new Error('email không chính xác');
    }
    const { id } = checkMail;
    const api = `localhost:4050/api/users/change-pass-mail/${id}`;
    await this.sendMailService.sendMail(
      email,
      email,
      `You have requested a password reset. Click the following link to reset your password ${api}`,
    );
  }

  async changeP(id: string) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        password: 'Abc12345',
      },
    );
  }

  async changePasswordApp(body: ChangePassDto, id: string) {
    const { newPassword, oldPassword } = body;
    return await this.userModel.findOneAndUpdate(
      { _id: id, password: oldPassword },
      {
        password: newPassword,
      },
    );
  }

  async activeUser(email: string) {
    const checkMail = await this.userModel.findOne({
      email,
    });
    if (!checkMail) {
      throw new Error('email không chính xác');
    }
    const { id } = checkMail;
    return await this.userModel.updateOne(
      {
        _id: id,
      },
      {
        active: true,
      },
    );
  }
}
