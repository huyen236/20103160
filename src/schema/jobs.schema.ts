import * as mongoose from 'mongoose';
import { IJobDocument } from 'src/interfaces';

const JobSchema = new mongoose.Schema<IJobDocument>(
  {
    job_name: { type: String, default: null, required: true },
    description_job: { type: String },
    code: { type: String },
    wage: { type: String },
    benefits: { type: String },
    address: { type: String },
    request_cv: { type: String },
    company_id: { type: String },
    career_id: { type: String},
    time_start: { type: Date },
    time_end: { type: Date },
    deleted_by: { type: String, default: null, index: true },
    deleted_at: { type: Number, default: null },
    created_at: { type: Number, index: true },
    updated_at: { type: Number },
    created_by: { type: String, default: null },
    updated_by: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      currentTime: () => Date.now(),
    },
    collection: 'jobs',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default JobSchema;
