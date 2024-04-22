import { Types } from "mongoose";

export interface IJobApprovalStatistic {
    from_time?: number;
    to_time?: number;
    company_id?: Types.ObjectId | string;
}

export interface IApplyJobByTimeStatistic {
    from_time?: number;
    to_time?: number;
    company_id?: Types.ObjectId | string;
    job_id?: Types.ObjectId | string;
}