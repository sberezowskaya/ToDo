<template>
  <div class="fullscreen bg-primary text-white flex flex-center">
    <q-card flat bordered class="q-pa-lg" style="width: 100%; max-width: 400px;">
      <div class="text-h5 text-center q-mb-lg">Вход в систему</div>
      
      <q-form @submit.prevent="handleLogin">
        <q-input
          v-model="loginForm.username"
          label="Логин"
          outlined
          bg-color="white"
          class="q-mb-sm"
          :rules="[rules.required]"
        />
        
        <q-input
          v-model="loginForm.password"
          label="Пароль"
          type="password"
          outlined
          bg-color="white"
          class="q-mb-md"
          :rules="[(val) => rules.minLength(val, 3)]"
        />
        
        <q-btn 
          type="submit" 
          color="primary" 
          label="Войти" 
          class="full-width" 
          :loading="userStore.isLoading" 
        />

        <!-- Наш новый компонент для ошибок -->
        <FormError :message="errorMessage" />
      </q-form>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { useErrorHandler } from '../composables/useErrorHandler';
import { useValidation } from '../composables/useValidation';
import FormError from '../components/FormError.vue';

const router = useRouter();
const userStore = useUserStore();
const { errorMessage, handleError, clearError } = useErrorHandler();
const { rules } = useValidation();

const loginForm = reactive({
  username: '',
  password: ''
});

async function handleLogin(): Promise<void> {
  clearError();
  const success = await userStore.login(loginForm.username, loginForm.password);
  
  if (success) {
    router.push('/');
  } else {
    handleError(new Error('Неверный логин или пароль'));
  }
}

onMounted(() => {
  // Если в userStore есть ошибка (например, сетевая), показываем её
  if (userStore.error) {
    handleError(new Error(userStore.error));
  }
});
</script>
