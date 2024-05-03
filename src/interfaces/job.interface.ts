import { Types } from 'mongoose';

export interface IJobDocument {
  job_name?: string;
  description_job?: string;
  code: string;
  wage?: string;
  benefits?: string;
  address?: string;
  request_cv?: string;
  company_id?: Types.ObjectId | string;
  time_start?: Date;
  time_end?: Date;
  created_by?: string;
  created_at?: number;
  updated_by?: string;
  updated_at?: number;
  career_id: Types.ObjectId | string;
  deleted_by?: string;
  deleted_at?: number;
}
