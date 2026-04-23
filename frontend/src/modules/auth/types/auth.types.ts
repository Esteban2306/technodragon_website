export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type RegisterDto = {
  email: string;
  password: string;
  name: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthResponse = AuthUser;

export type RefreshResponse = {
  ok: true;
};

export type LogoutResponse = {
  ok: true;
};