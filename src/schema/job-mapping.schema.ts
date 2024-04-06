import * as mongoose from 'mongoose';

const JobMappingSchema = new mongoose.Schema(
  {
    job_code: { type: String, default: null, required: true },
    user_id: { type: String },
    status: { type: String },
    company_code: { type: String },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
    deletedBy: { type: String, default: null, index: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    collection: 'job-mapping',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default JobMappingSchema;
