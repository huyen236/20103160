import * as mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, default: null, required: true },
    email: { type: String, default: null, index: true, unique: true },
    phone: { type: String, default: null, unique: true },
    address_company: { type: String },
    tax_code: { type: String },
    link: { type: String },
    admin_id: { type: String },
    createdBy: { type: String },
    updatedBy: { type: String },
    deletedBy: { type: String },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    collection: 'users',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default CompanySchema;
