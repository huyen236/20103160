import * as mongoose from 'mongoose';
import { IJobMappingDocument } from 'src/interfaces';

const JobMappingSchema = new mongoose.Schema<IJobMappingDocument>(
  {
    job_id: { type: String, default: null, required: true },
    status: { type: String },
    user_id: { type: String },
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
    collection: 'job-mapping',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default JobMappingSchema;
