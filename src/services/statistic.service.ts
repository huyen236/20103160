import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { STATUS } from 'src/constants';
import {
  IApplyJobByTimeStatistic,
  ICareerDocument,
  IJobApprovalStatistic,
  IJobMappingDocument,
  IUserDocument,
} from 'src/interfaces';
import { ICompanyDocument } from 'src/interfaces/company.interface';
import { IJobDocument } from 'src/interfaces/job.interface';

@Injectable()
export class StatisticService {
  constructor(
    @InjectModel('job-mapping')
    private readonly jobMappingModel: Model<IJobMappingDocument>,
    @InjectModel('jobs') private readonly jobModel: Model<IJobDocument>,
    @InjectModel('users') private readonly userModel: Model<IJobDocument>,
    @InjectModel('companys')
    private readonly companyModel: Model<ICompanyDocument>,
    @InjectModel('careers')
    private readonly careerModel: Model<ICareerDocument>,
  ) {}

  async applyJobByTimeStatistic(body: IApplyJobByTimeStatistic) {
    const filter: any = this.filter(body);
    if (body.job_id) {
      const job = await this.jobModel.findOne({
        _id: body.job_id,
      });
      if (!job) {
        throw new Error('job not found');
      }
      filter.job_id = body.job_id;
      filter.company_id = job.company_id;
    }
    if (body.company_id) {
      const job_id = await this.jobModel.find({
        company_id: body.company_id,
      });
      if (job_id.length > 0) {
        filter.job_id = {
          $in: job_id,
        };
      }
    }
    const jobMapping = await this.jobMappingModel.find(filter);
    const data = {
      data: jobMapping,
      count: jobMapping.length,
    };
    return data;
  }

  async jobStatistic(body: IJobApprovalStatistic) {
    const filter: any = this.filter(body);
    filter.company_id = body.company_id;
    const job = await this.jobModel.find(filter);
    const data = {
      data: job,
      count: job.length,
    };
    return data;
  }

  async userJobApprovalStatistic(body: IJobApprovalStatistic, user: any) {
    const filter: any = this.filter(body);
    filter.status = STATUS.SUCCESS;
    filter.user_id = user?._id;
    const jobMapping = await this.jobMappingModel.find(filter);
    const result = [];
    jobMapping.forEach(async (e) => {
      const job = await this.jobModel.findOne({
        _id: e.job_id,
      });
      if (job) {
        result.push(job);
      }
    });
    const data = {
      result,
      count: jobMapping.length,
    };
    return data;
  }

  async adminJobApprovalStatistic(body: IJobApprovalStatistic, user: any) {
    const filter: any = this.filter(body);
    filter.status = STATUS.SUCCESS;
    if (body.company_id) {
      const job_id = await this.jobModel.find({
        company_id: body.company_id,
      });
      if (job_id.length > 0) {
        filter.job_id = {
          $in: job_id,
        };
      }
    }
    const jobMapping = await this.jobMappingModel.find(filter);
    const result = [];
    jobMapping.forEach(async (e) => {
      const job = await this.jobModel.findOne({
        _id: e.job_id,
      });
      if (job) {
        result.push(job);
      }
    });
    const data = {
      result,
      count: jobMapping.length,
    };
    return data;
  }

  filter(body: any) {
    const filter: FilterQuery<IJobMappingDocument> = {};
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
    return filter;
  }
}
