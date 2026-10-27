<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="toggleLeftDrawer" />
        
        <q-toolbar-title>
          Todo App
        </q-toolbar-title>

        <!-- Breadcrumbs (Хлебные крошки) -->
        <q-breadcrumbs class="text-white q-mr-md gt-xs">
          <q-breadcrumbs-el label="Главная" to="/" />
          <q-breadcrumbs-el v-if="currentBreadcrumb" :label="currentBreadcrumb" />
        </q-breadcrumbs>

        <q-btn flat round icon="settings" to="/settings" class="q-mr-sm" />
        <q-btn flat round icon="logout" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Навигация</q-item-label>
        <q-item clickable to="/" exact>
          <q-item-section avatar><q-icon name="list" /></q-item-section>
          <q-item-section>Задачи</q-item-section>
        </q-item>
        <q-item clickable to="/settings">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Настройки</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';

const leftDrawerOpen = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

function toggleLeftDrawer(): void {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Вычисляем текущую хлебную крошку из meta-полей маршрута
const currentBreadcrumb = computed(() => {
  return route.meta.breadcrumb as string | undefined;
});

function logout(): void {
  userStore.logout();
  router.push('/login');
}
</script>
