import { ref, watch, type Ref } from 'vue';

/**
 * Создаёт реактивное значение, синхронизированное с localStorage.
 *
 * T — тип хранимых данных, например TodoItem[].
 * watch(..., { deep: true }) отслеживает и изменения вложенных полей массива.
 * Проверка typeof window защищает код от окружений без браузера.
 */
export function useLocalStorage<T>(key: string, initialValue: T): Ref<T> {
  const readInitialValue = (): T => {
    if (typeof window === 'undefined') return initialValue;

    try {
      const rawValue = window.localStorage.getItem(key);
      return rawValue === null ? initialValue : (JSON.parse(rawValue) as T);
    } catch {
      // Если данные повреждены или браузер запретил доступ, используем значение по умолчанию.
      return initialValue;
    }
  };

  const state = ref(readInitialValue()) as Ref<T>;

  watch(
    state,
    (newValue) => {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch {
        // Возможна ошибка квоты/доступа. Приложение продолжает работать в памяти.
      }
    },
    { deep: true }
  );

  return state;
}
