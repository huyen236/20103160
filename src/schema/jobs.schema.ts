import * as mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    job_name: { type: String, default: null, required: true },
    description_job: { type: String },
    wage: { type: String },
    benefits: { type: String },
    address: { type: String },
    request_cv: { type: String },
    company_code: { type: String },
    time_start: { type: Date },
    time_end: { type: Date },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
    deletedBy: { type: String, default: null, index: true },
    deletedAt: { type: Date, default: null },
    
  },
  {
    timestamps: true,
    collection: 'jobs',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default JobSchema;
