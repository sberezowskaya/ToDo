import { ref } from 'vue';
import { getUserFriendlyMessage } from '../utils/errorHandling';

export function useErrorHandler() {
  const errorMessage = ref<string | null>(null);

  function handleError(error: unknown): void {
    errorMessage.value = getUserFriendlyMessage(error);
  }

  function clearError(): void {
    errorMessage.value = null;
  }

  return { errorMessage, handleError, clearError };
}
