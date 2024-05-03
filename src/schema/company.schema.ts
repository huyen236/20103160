import * as mongoose from 'mongoose';
import { ICompanyDocument } from 'src/interfaces';

const CompanySchema = new mongoose.Schema<ICompanyDocument>(
  {
    name: { type: String, default: null, required: true },
    email: { type: String, default: null, index: true, unique: true },
    phone: { type: String, default: null, unique: true },
    code: { type: String },
    address_company: { type: String },
    tax_code: { type: String },
    link: { type: String },
    admin_id: { type: String },
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
    collection: 'companys',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default CompanySchema;
