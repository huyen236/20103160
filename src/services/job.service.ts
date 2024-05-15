import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { GetListJobDto, GetListJobMappingDto } from 'src/dtos';
import { CreateJobDto } from 'src/dtos/job/create-job.dto';
import { CompanyNotFound } from 'src/exceptions';
import { ICareerDocument, IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';
import { CompanysService } from './company.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('companys')
    private readonly companyModel: Model<ICompanyDocument>,
    @InjectModel('careers')
    private readonly careerModel: Model<ICareerDocument>,
    private readonly companysService: CompanysService,
  ) {}

  async createJob(body: CreateJobDto, user: any) {
    this.companysService.checkAccount(user);
    const company = await this.companysService.getInfoCompany(user);
    const {
      job_name,
      description_job,
      wage,
      benefits,
      address,
      request_cv,
      time_start,
      time_end,
      career_id,
    } = body;
    if (!user.is_admin) {

      throw new Error('Bạn không có quyền tạo job');
    }
    if (career_id) {
      const career = await this.careerModel.findOne({
        _id: career_id,
      });
      if (!career) {
        throw new Error('career khong ton tai');
      }
    }
    const dataCreate = {
      job_name,
      description_job,
      wage,
      benefits,
      address,
      request_cv,
      company_id: company?._id,
      time_start,
      time_end,
    };
    return await this.jobModel.create(dataCreate);
  }

  async getListJobs(body: GetListJobDto, user: any) {
    const checkUser = await this.userModel.findById(user?._id).lean();
    if (!checkUser) {
      throw new Error('User không tồn tại ');
    }
    const company = await this.companysService.getInfoCompany(user);
    return await this.jobModel.find({
      company_id: company._id
    });
  }

  filter(body: any) {
    const filter: FilterQuery<IJobDocument> = {};
    const { from_time, to_time } = body;
    if (from_time) {
      filter.created_at = {
        $gte: from_time,
      };
    }
    if (to_time) {
      (filter.created_at = filter.created_at),
        {
          $lte: from_time,
        };
    }
    if (body.job_name) {
      filter.job_name = { $regex: `.*${body.job_name}.*`, $options: 'i' };
    }

    return filter;
  }

  getFilter(body: any) {
    let filter: FilterQuery<IJobDocument> = {};
    if (body.job_name) {
      filter.job_name = { $regex: `.*${body.job_name}.*`, $options: 'i' };
    }
    return filter;
  }

  async getDetailJob(id: string) {
    const result = await this.jobModel
      .findOne({
        _id: id,
      })
      .lean();
    if (!result) {
      throw new Error('loi khong tim thay duoc thong tin job');
    }
    return result;
  }
}
