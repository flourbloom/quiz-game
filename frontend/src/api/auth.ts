// src/api/auth.ts
import api from './http';

export const login = (data: { username: string; password: string }) =>
  api.post('/api/auth/login', data);

export const register = (data: { username: string; password: string }) =>
  api.post('/api/auth/register', data);
