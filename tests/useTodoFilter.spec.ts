import { describe, expect, it } from 'vitest';
import { ref } from 'vue';
import { useTodoFilter } from '../src/composables/useTodoFilter';
import type { TodoItem } from '../src/types/todo';

const sampleTasks: TodoItem[] = [
  { id: '1', title: 'Купить молоко', completed: false, createdAt: 1 },
  { id: '2', title: 'Повторить computed', completed: true, createdAt: 2 },
  { id: '3', title: 'Прочитать про ref', completed: false, createdAt: 3 }
];

describe('useTodoFilter', () => {
  it('показывает все задачи по умолчанию', () => {
    const { filteredTasks } = useTodoFilter(ref(sampleTasks));
    expect(filteredTasks.value).toHaveLength(3);
  });

  it('фильтрует активные и выполненные задачи', () => {
    const { filter, filteredTasks } = useTodoFilter(ref(sampleTasks));
    filter.value = 'active';
    expect(filteredTasks.value.map((task) => task.id)).toEqual(['1', '3']);
    filter.value = 'completed';
    expect(filteredTasks.value.map((task) => task.id)).toEqual(['2']);
  });

  it('ищет по названию без учёта регистра', () => {
    const { search, filteredTasks } = useTodoFilter(ref(sampleTasks));
    search.value = 'COMPUTED';
    expect(filteredTasks.value.map((task) => task.id)).toEqual(['2']);
  });
});
