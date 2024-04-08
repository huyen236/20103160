import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IUserDocument, IUserSessionDocument } from 'src/interfaces';
import { SendMailService } from './send-mail.service';
import { LoginDto } from 'src/dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    @InjectModel('user-session')
    private readonly userSessionModel: Model<IUserSessionDocument>,
    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService,
  ) {}
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
    const userSession = await this.userSessionModel.findOne({
      user_id: checkLogin._id,
      is_active: true,
    });
    if (userSession) {
      throw new Error('đã được login');
    }
    const payload = {
      email,
      password,
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

  // get thong tin chi tiet cua ng login
  async getUser(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) {
      throw new Error('user khong ton tai');
    }
    return user;
  }

  // dang ki tai khoan
  async register(body: any) {
    const { email, phone, name, password, address } = body;
    const checkEmail = await this.userModel
      .findOne({
        email,
      })
      .lean();
    if (!checkEmail) {
      throw new Error('email da duoc dang ki');
    }
    return await this.userModel.create({
      name,
      email,
      password,
      phone,
      address,
    });
  }

  //update thong tin nguoi login va update chi tiet cua user hoac admin (co the dung update cho cv luon)
  async updateInfoUser(body: any, id: string) {
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
    };
    return this.userModel.updateOne(
      {
        _id: id,
      },
      dataUpdate,
    );
  }

  // thieu api send mail de login khi tao tai khoan

  async ForgotPassword(email: string) {
    const checkMail = await this.userModel.findOne({
      email,
    });
    if (!checkMail) {
      throw new Error('email không chính xác');
    }
    const { id } = checkMail;
    await this.sendMailService.sendMail(
      email,
      email,
      `You have requested a password reset. Click the following link to reset your password`, // link lấy từ api changeP
    );
  }

  // viet api link để cho user đổi mk mặc định
  async changeP(id: string) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        password: '123456', // password  mặc định
      },
    );
  }

  async changePasswordApp(body: any) {
    const { password, id } = body;
    return await this.userModel.findOneAndUpdate(
      { _id: id },
      {
        password, // password  mặc định
      },
    );
  }
}
