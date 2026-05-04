// src/api/auth.ts
import axios from 'axios';

export const login = (data: { username: string; password: string }) =>
  axios.post('/api/auth/login', data);

export const register = (data: { username: string; password: string }) =>
  axios.post('/api/auth/register', data);
