<template>
  <q-page class="page q-pa-md" :class="{ 'bg-dark text-white': uiStore.isDarkMode }">
    <div class="content">
      
      <!-- Ошибка глобальная -->
      <q-banner v-if="errorMessage" class="bg-negative text-white q-mb-md" rounded>
        {{ errorMessage }}
        <template v-slot:action>
          <q-btn flat color="white" label="Закрыть" @click="clearError" />
        </template>
      </q-banner>

      <div class="text-h4 text-weight-bold q-mb-sm">Задачи</div>
      
      <q-form class="row q-col-gutter-sm q-mb-md" @submit.prevent="addTask">
        <div class="col">
          <q-input
            v-model="newTitle"
            outlined
            label="Новая задача"
            :rules="[rules.taskTitle]"
            hide-bottom-space
          />
        </div>
        <div class="col-auto">
          <q-btn type="submit" color="primary" icon="add" label="Добавить" :loading="store.isLoading" />
        </div>
      </q-form>

      <q-input v-model="search" outlined dense clearable class="q-mb-md" label="Поиск" />

      <div class="row items-center justify-between q-gutter-sm q-mb-md">
        <q-btn-toggle v-model="filter" no-caps unelevated toggle-color="primary" color="white" text-color="dark" :options="filterOptions" />
      </div>

      <div v-if="store.isLoading && store.tasks.length === 0" class="text-center q-pa-lg">
        <q-spinner color="primary" size="3em" />
        <div class="q-mt-sm">Загрузка задач с сервера...</div>
      </div>

      <transition-group v-else name="task-list" tag="div" class="task-list">
        <TodoItem v-for="task in filteredTasks" :key="task.id" :todo="task" @toggle="store.toggleTodo" @remove="store.deleteTodo" />
      </transition-group>

      <q-card v-if="filteredTasks.length === 0 && !store.isLoading" flat bordered class="empty-state q-pa-xl text-center">
        <q-icon name="checklist" size="48px" color="grey-5" />
        <div class="text-subtitle1 q-mt-sm">Задач пока нет</div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todoStore';
import { useUiStore } from '../stores/uiStore';
import { useTodoFilter } from '../composables/useTodoFilter';
import { useErrorHandler } from '../composables/useErrorHandler';
import { useValidation } from '../composables/useValidation';
import TodoItem from '../components/TodoItem.vue';
import type { TodoFilter } from '../composables/useTodoFilter';

const store = useTodoStore();
const uiStore = useUiStore();
const newTitle = ref('');
const { filter, search, filteredTasks } = useTodoFilter(store.tasks);
const { errorMessage, handleError, clearError } = useErrorHandler();
const { rules } = useValidation();

const filterOptions: { label: string; value: TodoFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' }
];

onMounted(async () => {
  await store.fetchTodos();
  if (store.error) {
    handleError(new Error(store.error));
  }
});

async function addTask(): Promise<void> {
  clearError();
  if (!newTitle.value.trim()) {
    handleError(new Error('Название задачи не может быть пустым'));
    return;
  }
  
  await store.addTodo(newTitle.value);
  if (store.error) {
    handleError(new Error(store.error));
  } else {
    newTitle.value = '';
  }
}
</script>

<style scoped>
.page { min-height: calc(100vh - 50px); transition: background-color 0.3s; }
.content { max-width: 820px; margin: 0 auto; }
.empty-state { border-radius: 16px; }
.task-list-enter-active, .task-list-leave-active, .task-list-move { transition: opacity 220ms ease, transform 220ms ease; }
.task-list-enter-from { opacity: 0; transform: translateY(10px); }
.task-list-leave-to { opacity: 0; transform: translateX(14px); }
.task-list-leave-active { position: absolute; width: min(100%, 820px); }
</style>
