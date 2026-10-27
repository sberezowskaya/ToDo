import { ref } from 'vue';

export function useAsync<T>() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const data = ref<T | null>(null);

  /**
   * Выполняет асинхронную функцию, управляя состояниями загрузки и ошибок.
   */
  async function execute(fn: () => Promise<T>): Promise<T | null> {
    isLoading.value = true;
    error.value = null;
    try {
      const result = await fn();
      data.value = result;
      return result;
    } catch (e: any) {
      // Красивое извлечение текста ошибки
      error.value = e.response?.data?.message || e.message || 'Произошла ошибка';
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  return { isLoading, error, data, execute };
}
