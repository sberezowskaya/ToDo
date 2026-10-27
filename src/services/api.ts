const BASE_URL = '/api';

export const api = {
  getToken(): string | null {
    return localStorage.getItem('mock-jwt-token');
  },
  
  setToken(token: string): void {
    localStorage.setItem('mock-jwt-token', token);
  },
  
  removeToken(): void {
    localStorage.removeItem('mock-jwt-token');
  },

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `Ошибка API: ${response.status}`);
    }

    return response.json();
  },

  get<T>(endpoint: string): Promise<T> { return this.request<T>(endpoint, { method: 'GET' }); },
  post<T>(endpoint: string, data: unknown): Promise<T> { return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(data) }); },
  delete<T>(endpoint: string): Promise<T> { return this.request<T>(endpoint, { method: 'DELETE' }); },
  patch<T>(endpoint: string, data: unknown): Promise<T> { return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(data) }); },
};
