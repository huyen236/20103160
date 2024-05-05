import * as mongoose from 'mongoose';
import { ICareerDocument } from 'src/interfaces';

const CareerSchema = new mongoose.Schema<ICareerDocument>(
  {
    name: { type: String, default: null, required: true },
    code: { type: String, required: true },
    deleted_by: { type: String, default: null },
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
    collection: 'careers',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default CareerSchema;
