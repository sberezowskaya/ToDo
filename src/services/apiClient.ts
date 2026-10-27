import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// Создаем экземпляр Axios
const apiClient: AxiosInstance = axios.create({
  baseURL: '/api', // Наш прокси перенаправит это на mock-сервер
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// 1. Интерсептор ЗАПРОСА: подставляем токен
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. Интерсептор ОТВЕТА: обрабатываем 401 и Retry (повторные попытки)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 (токен протух) и мы еще не пытались обновить токен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post('/api/refresh', { refreshToken });
        
        localStorage.setItem('access_token', res.data.token);
        
        // Повторяем исходный запрос с новым токеном
        originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Если обновить не удалось — разлогиниваем
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/#/login';
        return Promise.reject(refreshError);
      }
    }

    // Retry логика для сетевых ошибок (нет интернета / сервер лежит)
    if (!error.response && originalRequest._retryCount < 3) {
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      // Ждем 1 секунду и пробуем снова
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return apiClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
