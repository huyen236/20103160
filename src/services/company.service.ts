import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';

@Injectable()
export class CompanysService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    // @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('company')
    private readonly companyModel: Model<ICompanyDocument>,
    private readonly jwtService: JwtService,
  ) {}

  // xu ly goi tao company va 1 tai khoan admin chi tao duoc 1 cong ty
  async createCompanyOnlyOne(body: any, User: any) {
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: User?._id,
        code: body.code,
      })
      .lean();
    if (checkCompany) {
      throw new Error('Tai khoan da dang ki cong ty roi');
    }
    const { name, email, phone, address_company, tax_code, link } = body;
    return await this.companyModel.create({
      name,
      email,
      phone,
      address_company,
      tax_code,
      link,
      admin_id: User?._id,
      code: `${name}-${phone}`,
    });
  }

  // get thong tin chi tiet cua cong ty
  async getInfoCompany(id: string) {
    const checkCompany = await this.companyModel
      .findOne({
        _id: id,
      })
      .lean();
    if (!checkCompany) {
      throw new Error('Cong ty khong ton tai');
    }
    return checkCompany;
  }

  // update thong tin cua cong ty
  async updateCompany(body: any, id: string) {
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: id,
      })
      .lean();
    if (!checkCompany) {
      throw new Error('Cong ty khong ton tai');
    }
    const { name, email, phone, address_company, tax_code, link, code } = body;
    return await this.companyModel.updateOne(
      { _id: checkCompany._id },
      {
        name,
        email,
        phone,
        address_company,
        tax_code,
        link,
        code,
      },
    );
  }
}
