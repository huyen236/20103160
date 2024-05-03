import * as mongoose from 'mongoose';
import { IUserDocument } from 'src/interfaces';

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    name: { type: String, default: null, required: true },
    email: { type: String, default: null, index: true, unique: true },
    password: { type: String, default: null, select: false },
    phone: { type: String, default: null, unique: true },
    address: { type: String },
    gender: { type: String },
    skill: { type: [String] },
    experience: { type: String },
    description_job: { type: String },
    specialized: { type: String },
    industry: { type: String },
    province: { type: String },
    is_admin: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
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
    collection: 'users',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default UserSchema;
