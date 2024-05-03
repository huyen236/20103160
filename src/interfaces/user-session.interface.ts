import { Types } from 'mongoose';

export interface IUserSessionDocument {
  logout_time?: number;
  login_time: number;
  expire_time?: number;
  user_id?: Types.ObjectId;
  is_active?: boolean;
  created_at?: number;
  updated_at?: number;
}
