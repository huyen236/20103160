import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { STATUS } from 'src/constants';
import { IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';

@Injectable()
export class JobMappingService {
  constructor(
    @InjectModel('job-mapping') private readonly jobMappingModel: Model<IUserDocument>,
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('users') private readonly userModel: Model<IJobDocument>,
    @InjectModel('company')
    private readonly companyModel: Model<ICompanyDocument>,
  ) { }

  // tao job cho cong ty

  async applyCV(body: any, user: any) {
    const { job_id, company_code } = body
    const checkApplyJob = await this.jobMappingModel.findOne({
      user_id: user?._id,
      job_id
    })
    if (checkApplyJob) {
      throw new Error("user da apply vo job cua cong ty roi")
    }
    const data = {
      job_id,
      user_id: user?._id,
      status: 'submit'
    }
    // status: submit, success, reject
    return await this.jobMappingModel.create(data)
  }

  async approvalCV(body: any, user: any) {
    const company = await this.companyModel.findOne({
      admin_id: user?._id
    })
    if (!company) {
      throw new Error("khong phai admin cua cong ty")
    }
    //status = success
    const { job_id, company_code, status, user_id } = body
    const job = await this.jobModel.findOne({
      _id: job_id,
      company_code: company_code,
      status: STATUS.ACTIVE,
      time_end: {
        $lte: new Date()
      }
    })
    if (!job) {
      throw new Error("Job khong ton tai hoac da het han hoac bi dong lai ")
    }
    const jobCompany = await this.jobMappingModel.findOne({
      job_id,
      status: STATUS.SUBMIT,
      user_id
    })
    if (!jobCompany) {
      throw new Error("dang o trang thai khong cap nhat duoc hoac khong ton tai")
    }
    return await this.jobMappingModel.updateOne({ _id: jobCompany._id }, {
      status: STATUS.SUCCESS
    })
  }

  async getListJobApply(body: any, user: any) {
    const { company_code, status } = body
    const filter = {
      status,
      company_code,
      // filter time create_at nua
    }
    const jobApply = await this.jobMappingModel.find({
      filter
    })
    const arrResult = []
    jobApply.forEach(async (e: any) => {
      const job = await this.jobModel.findOne({
        code: e.job_code
      })
      arrResult.push({
        job_name: job.job_name,
        status: e.status,
        created_at: e.created_at,
        updated_at: e.updated_at,
        updated_by: e.updated_by,
        created_by: e.created_by
      })
    })
    return arrResult
  }
}
