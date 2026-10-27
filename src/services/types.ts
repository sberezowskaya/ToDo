export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: { id: string; username: string; name: string };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  settings: { theme: 'light' | 'dark' };
}
