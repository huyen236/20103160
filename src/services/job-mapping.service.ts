import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { STATUS } from 'src/constants';
import { GetListJobMappingDto, approvalCVDto } from 'src/dtos';
import { IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';
import { CompanysService } from './company.service';

@Injectable()
export class JobMappingService {
  constructor(
    @InjectModel('job-mapping')
    private readonly jobMappingModel: Model<IUserDocument>,
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('users') private readonly userModel: Model<IJobDocument>,
    @InjectModel('companys')
    private readonly companyModel: Model<ICompanyDocument>,
    private readonly companysService: CompanysService,
  ) {}


  async applyCV(body: any, user: any) {
    const { job_id } = body;
    const checkApplyJob = await this.jobMappingModel.findOne({
      user_id: user?._id,
      job_id,
    });
    if (checkApplyJob) {
      throw new Error('user da apply vo job cua cong ty roi');
    }
    const data = {
      job_id,
      user_id: user?._id,
      status: 'submit',
    };
    return await this.jobMappingModel.create(data);
  }

  async approvalCV(body: approvalCVDto, user: any) {
    this.companysService.checkAccount(user);
    const company = await this.companyModel.findOne({
      admin_id: user?._id,
    });
    if (!company) {
      throw new Error('khong phai admin cua cong ty');
    }
    const { job_id, company_id, status } = body;
    const job = await this.jobModel.findOne({
      job_id,
      company_id,
      status: STATUS.ACTIVE,
      time_end: {
        $lte: new Date(),
      },
    });
    if (!job) {
      throw new Error('Job khong ton tai hoac da het han hoac bi dong lai ');
    }
    const jobCompany = await this.jobMappingModel.findOne({
      job_id,
      status: STATUS.SUBMIT,
      user_id: user?._id,
    });
    if (!jobCompany) {
      throw new Error(
        'dang o trang thai khong cap nhat duoc hoac khong ton tai',
      );
    }
    return await this.jobMappingModel.updateOne(
      { job_id, status: STATUS.SUBMIT, user_id: user?._id },
      {
        status: STATUS.SUCCESS,
      },
    );
  }

  async getListJobApply(body: GetListJobMappingDto, user: any) {
    const { company_id, status } = body;
    const filter = {
      status,
      company_id,
    };
    const jobApply = await this.jobMappingModel.find({
      filter,
    });
    const arrResult = [];
    jobApply.forEach(async (e: any) => {
      const job = await this.jobModel.findOne({
        _id: e.job_id,
      });
      arrResult.push({
        job_name: job.job_name,
        status: e.status,
        created_at: e.created_at,
        updated_at: e.updated_at,
        updated_by: e.updated_by,
        created_by: e.created_by,
      });
    });
    return arrResult;
  }
}
