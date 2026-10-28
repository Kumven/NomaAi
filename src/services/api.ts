import type { UserProfile } from '../types';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

interface ApiResponse<T> {
  user: T;
  error?: string;
}

async function request<T>(path: string, body?: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: body === undefined ? 'GET' : 'POST',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const payload = await response.json() as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(payload.error || `Request failed (${response.status})`);
  }

  return payload.user;
}

export interface SignupRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  farmState: string;
  farmLga: string;
  selectedPlan: 'free' | 'premium';
}

export const signup = (data: SignupRequest): Promise<UserProfile> =>
  request<UserProfile>('/auth/signup', data);

export const login = (email: string, password: string): Promise<UserProfile> =>
  request<UserProfile>('/auth/login', { email, password });
