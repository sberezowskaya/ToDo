<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card flat bordered style="width: 100%; max-width: 600px;">
      <q-card-section>
        <div class="text-h5">Настройки</div>
        <div class="text-subtitle2 text-grey">Управление приложением</div>
      </q-card-section>
      
      <q-separator />
      
      <q-card-section>
        <q-toggle
          v-model="uiStore.isDarkMode"
          label="Темная тема"
          color="primary"
        />
        <q-toggle
          v-model="uiStore.showSidebar"
          label="Показывать боковую панель"
          color="primary"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useUiStore } from '../stores/uiStore';
const uiStore = useUiStore();
</script>
