import { describe, it, expect } from 'vitest';
import { validationRules } from '../../../src/utils/validation';

describe('Validation Rules', () => {
  describe('required', () => {
    it('должен возвращать true для непустой строки', () => {
      expect(validationRules.required('Текст')).toBe(true);
    });

    it('должен возвращать сообщение об ошибке для пустой строки', () => {
      const result = validationRules.required('', 'Логин');
      expect(result).toBe('Логин обязательно для заполнения');
    });
  });

  describe('email', () => {
    it('должен пропускать правильный email', () => {
      expect(validationRules.email('test@mail.ru')).toBe(true);
    });

    it('должен отклонять неправильный email', () => {
      expect(validationRules.email('test-mail.ru')).toBe('Некорректный email');
    });
  });

  describe('taskTitle', () => {
    it('должен пропускать валидное название', () => {
      expect(validationRules.taskTitle('Купить хлеб')).toBe(true);
    });

    it('должен отклонять пустое название', () => {
      expect(validationRules.taskTitle('')).toBe('Название задачи не может быть пустым');
    });
  });
});
