export interface IUserDocument {
  name?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  is_admin?: boolean;
}
