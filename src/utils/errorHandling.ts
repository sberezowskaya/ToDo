// Классы кастомных ошибок
export class NetworkError extends Error {
  constructor(message = 'Проблема с сетью. Проверьте интернет.') { super(message); this.name = 'NetworkError'; }
}

export class ValidationError extends Error {
  constructor(message: string) { super(message); this.name = 'ValidationError'; }
}

export class BusinessError extends Error {
  constructor(message: string) { super(message); this.name = 'BusinessError'; }
}

/**
 * Преобразует любую ошибку в понятное для пользователя сообщение
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof NetworkError) return error.message;
  if (error instanceof ValidationError) return error.message;
  if (error instanceof BusinessError) return error.message;
  
  // Если это ошибка Axios/API
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as any;
    if (axiosError.response?.status === 401) return 'Ошибка авторизации. Войдите заново.';
    if (axiosError.response?.status === 404) return 'Запрашиваемые данные не найдены.';
    if (axiosError.response?.status >= 500) return 'Ошибка на сервере. Попробуйте позже.';
  }

  return 'Произошла непредвиденная ошибка.';
}

/**
 * Глобальный обработчик необработанных исключений
 */
export function setupGlobalErrorHandler(app: any): void {
  app.config.errorHandler = (err: unknown) => {
    console.error('[Глобальная ошибка]:', err);
    // Здесь можно отправить ошибку в Sentry или показать глобальный тост
  };

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Необработанный промис]:', event.reason);
  });
}
