export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

// Тип для создания (без id и createdAt)
export type CreateTodoDto = Omit<TodoItem, 'id' | 'createdAt' | 'completed'>;

// Discriminated union для валидации
export type TodoValidationResult = 
  | { success: true; data: TodoItem }
  | { success: false; error: string };
