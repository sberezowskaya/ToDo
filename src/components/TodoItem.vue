<template>
  <div class="q-pa-sm row items-center justify-between border-bottom">
    <div class="row items-center">
      <q-checkbox
        :model-value="todo.completed"
        @update:model-value="emit('toggle', todo.id)"
        color="primary"
      />
      <div
        class="q-ml-sm text-subtitle1"
        :class="{ 'text-strike text-grey': todo.completed }"
        :style="{ opacity: todo.completed ? 0.6 : 1 }"
      >
        {{ todo.title }}
      </div>
    </div>
    
    <div class="text-caption text-grey-6 row items-center">
      {{ formattedDate }}
      <q-btn
        icon="delete"
        color="negative"
        flat
        round
        dense
        class="q-ml-md"
        @click="emit('remove', todo.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TodoItem } from '../types/todo';

const props = defineProps<{
  todo: TodoItem;
}>();

const emit = defineEmits<{
  (e: 'toggle', id: string): void;
  (e: 'remove', id: string): void;
}>();

const formattedDate = computed(() => {
  const d = new Date(props.todo.createdAt);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
});
</script>

<style scoped>
.border-bottom {
  border-bottom: 1px solid #e0e0e0;
}
</style>
