import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from '../../../src/stores/todoStore';
import { todoService } from '../../../src/services/todoService';

// Мокаем сервис (чтобы тесты не делали реальных запросов)
vi.mock('../../../src/services/todoService', () => ({
  todoService: {
    getAll: vi.fn(),
    create: vi.fn(),
  }
}));

describe('Todo Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('должен загружать задачи', async () => {
    const mockData = [{ id: '1', title: 'Тест', completed: false, createdAt: 123 }];
    vi.mocked(todoService.getAll).mockResolvedValue(mockData);

    const store = useTodoStore();
    await store.fetchTodos();

    expect(store.tasks.length).toBe(1);
    expect(store.tasks[0].title).toBe('Тест');
  });

  it('должен обрабатывать ошибку при загрузке', async () => {
    vi.mocked(todoService.getAll).mockRejectedValue(new Error('Network Error'));

    const store = useTodoStore();
    await store.fetchTodos();

    expect(store.tasks.length).toBe(0);
    expect(store.error).toBeTruthy();
  });
});
