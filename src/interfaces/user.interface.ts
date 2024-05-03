import { Types } from 'mongoose';

export interface IUserDocument {
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  is_admin?: boolean;
  gender?: string;
  skill?: [string];
  experience?: string;
  description_job?: string;
  specialized?: string;
  industry?: string;
  province?: string;
  created_by?: string;
  created_at?: number;
  updated_by?: string;
  updated_at?: number;
  active?: boolean;
  deleted_by?: string;
  deleted_at?: number;
}
