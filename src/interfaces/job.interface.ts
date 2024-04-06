export interface IJobDocument {
  job_name?: string;
  description_job?: string;
  code: string;
  wage?: string;
  benefits?: string;
  address?: string;
  request_cv?: string;
  company_code?: string;
  status?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  deletedAt?: string;
  time_start?: Date;
  time_end?: Date;
}
