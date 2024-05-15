import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterCompanyDto, UpdateCompanyDto } from 'src/dtos/company';
import { CompanyNotFound } from 'src/exceptions';
import { AccountRegisteredCompany } from 'src/exceptions/company/account-registerted-company';
import { IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';

@Injectable()
export class CompanysService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,    @InjectModel('companys')
    private readonly companyModel: Model<ICompanyDocument>,
    private readonly jwtService: JwtService,
  ) {}

  checkAccount(user: any, id?: string) {
    if (!user?.is_admin) {
      throw new Error(
        'Bạn không có quyền hoặc không đúng dữ liệu của công ty bạn',
      );
    }
    return true;
  }

  async createCompanyOnlyOne(body: RegisterCompanyDto, user: any) {
    const data = this.checkAccount(user);
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: user?._id,
      })
      .lean();
    if (checkCompany) {
      throw new AccountRegisteredCompany('Tai khoan da dang ki cong ty roi');
    }
    const { name, email, phone, address_company, tax_code, link } = body;
    return await this.companyModel.create({
      name,
      email,
      phone,
      address_company,
      tax_code,
      link,
      admin_id: user?._id,
      code: `${name}-${phone}`,
    });
  }

 
  async getInfoCompany(user: any) {
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: user?._id,
      })
      .lean();
    if (!checkCompany) {
      throw new CompanyNotFound('Cong ty khong ton tai');
    }
    return checkCompany;
  }

  async updateCompany(body: UpdateCompanyDto, user: any) {
    const data = this.checkAccount(user);
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: user?._id,
      })
      .lean();
    if (!checkCompany) {
      throw new CompanyNotFound('Cong ty khong ton tai');
    }
    const { name, email, phone, address_company, tax_code, link } = body;
    return await this.companyModel.updateOne(
      { _id: checkCompany._id },
      {
        name,
        email,
        phone,
        address_company,
        tax_code,
        link,
      },
    );
  }
}
