import api from './http';
import type { AuthLoginRequest, AuthRegisterRequest, AuthResponse } from '../types/auth';

export const login = async (data: AuthLoginRequest) => {
  const response = await api.post<AuthResponse>('/api/auth/login', data);
  return response.data;
};

export const register = async (data: AuthRegisterRequest) => {
  const response = await api.post<AuthResponse>('/api/auth/register', data);
  return response.data;
};
