import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '../composables/useLocalStorage';

export const useUiStore = defineStore('ui', () => {
  // Храним тему в localStorage (по умолчанию светлая)
  const isDarkMode = useLocalStorage<boolean>('practice5-dark-mode', false);
  const showSidebar = ref(true);

  function toggleTheme(): void {
    isDarkMode.value = !isDarkMode.value;
  }

  function toggleSidebar(): void {
    showSidebar.value = !showSidebar.value;
  }

  return { isDarkMode, showSidebar, toggleTheme, toggleSidebar };
});
