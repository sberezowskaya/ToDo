import { describe, it, expect } from 'vitest';
import { ref } from 'vue';
import { useTodoFilter } from '../../../src/composables/useTodoFilter';
import type { TodoItem } from '../../../src/types';

describe('useTodoFilter', () => {
  const mockTasks = ref<TodoItem[]>([
    { id: '1', title: 'Задача 1', completed: false, createdAt: 1 },
    { id: '2', title: 'Задача 2', completed: true, createdAt: 2 },
    { id: '3', title: 'Купить хлеб', completed: false, createdAt: 3 },
  ]);

  it('должен возвращать все задачи при фильтре "all"', () => {
    const { filter, filteredTasks } = useTodoFilter(mockTasks);
    filter.value = 'all';
    expect(filteredTasks.value.length).toBe(3);
  });

  it('должен возвращать только активные задачи', () => {
    const { filter, filteredTasks } = useTodoFilter(mockTasks);
    filter.value = 'active';
    expect(filteredTasks.value.length).toBe(2);
    expect(filteredTasks.value[0].id).toBe('1');
  });

  it('должен фильтровать по поиску', () => {
    const { search, filteredTasks } = useTodoFilter(mockTasks);
    search.value = 'хлеб';
    expect(filteredTasks.value.length).toBe(1);
    expect(filteredTasks.value[0].id).toBe('3');
  });
});
