import { ref } from 'vue';
import { validationRules } from '../utils/validation';

export function useValidation() {
  const isValid = ref(true);
  const errors = ref<Record<string, string>>({});

  function validateField(field: string, value: string, rules: Array<(val: string) => true | string>): boolean {
    for (const rule of rules) {
      const result = rule(value);
      if (result !== true) {
        errors.value[field] = result;
        isValid.value = false;
        return false;
      }
    }
    delete errors.value[field];
    isValid.value = Object.keys(errors.value).length === 0;
    return true;
  }

  return { isValid, errors, validateField, rules: validationRules };
}
