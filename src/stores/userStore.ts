import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { authService } from '../services/authService';
import { useAsync } from '../composables/useAsync';

export const useUserStore = defineStore('user', () => {
  const username = ref<string | null>(localStorage.getItem('mock-user-name'));
  const isAuthenticated = computed((): boolean => !!username.value);

  // Используем наш новый composable для асинхронности
  const { isLoading, error, execute } = useAsync<void>();

  async function login(name: string, password: string): Promise<boolean> {
    const result = await execute(async () => {
      const authData = await authService.login(name, password);
      username.value = authData.user.name;
      localStorage.setItem('mock-user-name', authData.user.name);
    });
    
    return result !== null; // Если ошибка, result будет null
  }

  function logout(): void {
    authService.logout();
    localStorage.removeItem('mock-user-name');
    username.value = null;
  }

  return { username, isAuthenticated, isLoading, error, login, logout };
});
