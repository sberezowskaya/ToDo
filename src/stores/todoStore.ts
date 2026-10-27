import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { todoService } from '../services/todoService';
import { useAsync } from '../composables/useAsync';
import type { TodoItem } from '../types';

export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<TodoItem[]>([]);
  const { isLoading, error, execute } = useAsync<TodoItem[]>();

  const totalCount = computed((): number => tasks.value.length);
  const completedCount = computed((): number => tasks.value.filter((t) => t.completed).length);

  async function fetchTodos(): Promise<void> {
    const data = await execute(() => todoService.getAll());
    if (data) tasks.value = data;
  }

  async function addTodo(title: string): Promise<void> {
    const newTask = await execute(() => todoService.create(title));
    if (newTask) tasks.value.push(newTask);
  }

  async function toggleTodo(id: string): Promise<void> {
    const task = tasks.value.find((t) => t.id === id);
    if (!task) return;
    
    const updated = await execute(() => todoService.update(id, { completed: !task.completed }));
    if (updated) task.completed = updated.completed;
  }

  async function deleteTodo(id: string): Promise<void> {
    const result = await execute(() => todoService.delete(id));
    if (result !== null) tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  return { tasks, isLoading, error, totalCount, completedCount, fetchTodos, addTodo, toggleTodo, deleteTodo };
});
