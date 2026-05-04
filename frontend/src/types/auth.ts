// src/types/auth.ts
export interface AuthResponse {
  token: string;
  username: string;
}

export interface AuthLoginRequest {
  username: string;
  password: string;
}

export interface AuthRegisterRequest {
  username: string;
  password: string;
}
