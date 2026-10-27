import { computed, ref, type Ref } from 'vue';
import type { TodoItem } from '../types';

export type TodoFilter = 'all' | 'active' | 'completed';

export function useTodoFilter(tasks: Ref<TodoItem[]>) {
  const filter = ref<TodoFilter>('all');
  const search = ref('');

  const filteredTasks = computed((): TodoItem[] => {
    if (!tasks.value) return [];
    const normalizedSearch = search.value.trim().toLocaleLowerCase();

    return tasks.value.filter((task) => {
      const matchesStatus =
        filter.value === 'all' ||
        (filter.value === 'active' && !task.completed) ||
        (filter.value === 'completed' && task.completed);

      const matchesSearch = task.title.toLocaleLowerCase().includes(normalizedSearch);
      return matchesStatus && matchesSearch;
    });
  });

  return { filter, search, filteredTasks };
}
