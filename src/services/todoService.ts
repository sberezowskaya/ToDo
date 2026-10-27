import apiClient from './apiClient';
import type { TodoItem } from '../types';

export const todoService = {
  async getAll(): Promise<TodoItem[]> {
    const response = await apiClient.get<TodoItem[]>('/todos');
    return response.data;
  },
  
  async create(title: string): Promise<TodoItem> {
    const response = await apiClient.post<TodoItem>('/todos', {
      title,
      completed: false,
      createdAt: Date.now(),
    });
    return response.data;
  },

  async update(id: string, data: Partial<TodoItem>): Promise<TodoItem> {
    const response = await apiClient.patch<TodoItem>(`/todos/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }
};
