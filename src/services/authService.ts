import apiClient from './apiClient';
import type { AuthResponse } from './types';

export const authService = {
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/login', { username, password });
    
    if (response.data.token) {
      localStorage.setItem('access_token', response.data.token);
    }
    localStorage.setItem('refresh_token', response.data.refreshToken || 'mock-refresh');
    
    return response.data;
  },

  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};