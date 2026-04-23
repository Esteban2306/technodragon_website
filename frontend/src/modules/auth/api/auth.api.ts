import { httpClient } from "@/src/core/api/http/http-client";
import {
  LoginDto,
  RegisterDto,
  AuthUser,
  RefreshResponse,
  LogoutResponse
} from '../types/auth.types';

export const authApi = {
  register: (data: RegisterDto) =>
    httpClient.request<AuthUser>('/auth/register', 'POST', data),

  login: (data: LoginDto) =>
    httpClient.request<AuthUser>('/auth/login', 'POST', data),

  me: () =>
    httpClient.request<AuthUser>('/auth/me', 'GET'),

  refresh: () =>
    httpClient.request<RefreshResponse>('/auth/refresh', 'POST'),

  logout: () =>
    httpClient.request<LogoutResponse>('/auth/logout', 'POST'),
};