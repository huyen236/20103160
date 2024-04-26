import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { GetListJobMappingDto } from 'src/dtos';
import { CreateJobDto } from 'src/dtos/job/create-job.dto';
import { CompanyNotFound } from 'src/exceptions';
import { ICareerDocument, IUserDocument } from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('users') private readonly userModel: Model<IUserDocument>,
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('company')
    private readonly companyModel: Model<ICompanyDocument>,
    @InjectModel('careers')
    private readonly careerModel: Model<ICareerDocument>,
  ) {}

  // tao job cho cong ty
  async createJob(body: CreateJobDto, User: any) {
    // User lấy giá trị từ @User
    const {
      job_name,
      description_job,
      wage,
      benefits,
      address,
      request_cv,
      company_id,
      time_start,
      time_end,
      career_id,
    } = body;
    if (!User.is_admin) {
      // kiem tra xem phai la admin k
      throw new Error('Bạn không có quyền tạo job');
    }
    const checkCompany = await this.companyModel
      .findOne({
        admin_id: User?._id,
        _id: company_id,
      })
      .lean();
    if (checkCompany) {
      throw new CompanyNotFound(
        'Công ty không đúng hoặc không được liên kết với User admin',
      );
    }
    // const job = await this.jobModel.findOne({
    //   code,
    // });
    // if (job) {
    //   throw new Error('job da ton tai');
    // }
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
      company_id,
      time_start,
      time_end,
    };
    return await this.jobModel.create(dataCreate);
  }

  // get list job cua cong ty cho user hoac admin thay
  async getListJobs(body: GetListJobMappingDto, User: any) {
    const checkUser = await this.userModel.findById(User?._id).lean();
    if (!checkUser) {
      throw new Error('User không tồn tại');
    }
    const checkCompany = await this.companyModel
      .findOne({
        is_admin: User.is_admin,
      })
      .lean();
    if (!checkCompany) {
      throw new Error('Company không tồn tại');
    }
    // tim kiem theo gi thi bo vo body goi no ra de trong ham filter nay
    const filter = this.getFilter(body);
    return await this.jobModel.find({
      company_code: checkCompany.code,
      filter,
    });
  }

  filter(body: any) {
    const filter: FilterQuery<IJobDocument> = {};
    // to_time is than from_time (Epoch Times)
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

  // xu ly tim kiem theo job name hoac vi tri dia diem muc luong
  getFilter(body: any) {
    let filter: FilterQuery<IJobDocument> = {};
    if (body.job_name) {
      filter.job_name = { $regex: `.*${body.job_name}.*`, $options: 'i' };
    }
    // tim kiem theo dia diem thi dat 1 bien phan biet Mien bac mien nam mien trung
    // tim kiem theo muoc luong thi su dung tim kiem theo khoang wage
    //...
    return filter;
    // va nhieu cai khac
  }

  // get chi tiet cua 1 job
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
