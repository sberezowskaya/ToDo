export const validationRules = {
  required: (value: string, fieldName = 'Поле') => {
    return value && value.trim().length > 0 ? true : `${fieldName} обязательно для заполнения`;
  },
  
  minLength: (value: string, min: number) => {
    return value.length >= min ? true : `Минимальная длина — ${min} символов`;
  },
  
  maxLength: (value: string, max: number) => {
    return value.length <= max ? true : `Максимальная длина — ${max} символов`;
  },
  
  email: (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? true : 'Некорректный email';
  },
  
  taskTitle: (value: string) => {
    if (!value || value.trim().length === 0) return 'Название задачи не может быть пустым';
    if (value.length > 120) return 'Слишком длинное название (макс. 120)';
    return true;
  }
};

// Асинхронная валидация (проверка уникальности email)
export async function validateEmailUnique(email: string): Promise<boolean | string> {
  // Имитация запроса на сервер
  await new Promise(resolve => setTimeout(resolve, 500));
  if (email === 'admin@test.com') {
    return 'Этот email уже занят';
  }
  return true;
}
