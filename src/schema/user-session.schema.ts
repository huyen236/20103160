import { Schema, Model } from 'mongoose';
import { IUserSessionDocument } from 'src/interfaces';

const UserSessionSchema = new Schema<IUserSessionDocument>(
  {
    login_time: { type: Number },
    logout_time: { type: Number },
    expire_time: { type: Number },
    user_id: { type: Schema.Types.ObjectId, required: true },
    is_active: { type: Boolean, default: false },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      currentTime: () => Date.now(),
    },
    collection: 'user-session',
    autoIndex: true,
    autoCreate: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);
export default UserSessionSchema;
