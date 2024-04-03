import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDocument } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(body: any) {
    const { email, password } = body;
    //de co du lieu login thi add 1 data mau. khi nao chay
    // thi mo no ra chay xong r comment no lai de co du lieu login
    // await this.userModel.create({
    //   name: 'huyen',
    //   pure_name: 'huyen',
    //   email: 'huyentt123@gmail.com',
    //   password: 'huyentt123',
    //   phone: '0347442446',
    //   address: '249 pham van dong',
    // });
    const checkLogin = await this.userModel.findOne({
      email,
      password,
    });
    if (!checkLogin) {
      throw new Error('sai email hoac password');
    }
    const payload = {
      email,
      password,
      phone: checkLogin.phone,
      id: checkLogin._id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUser(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('user khong ton tai');
    }
    return user;
  }
}
