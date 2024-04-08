import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
  ) {}
}
