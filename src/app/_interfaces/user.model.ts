export interface UserModel {
  id: number | null;
  login: string;
  password: string | null;
  name: string;
  role: number;
}