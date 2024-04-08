export interface IUserDocument {
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  is_admin?: boolean;
  created_by?: string;
  created_at?: number;
  updated_by?: string;
  updated_at?: number;
}
