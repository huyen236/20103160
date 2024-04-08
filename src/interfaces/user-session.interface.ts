import { Types } from "mongoose";

export interface IUserSessionDocument {
  logout_time?: string;
  login_time: string;
  expire_time?: string;
  user_id?: Types.ObjectId;
  is_active?: number;
  created_at?: number;
  updated_at?: number;
}
