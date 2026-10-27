<template>
  <div v-if="message" class="text-negative text-caption q-mt-xs q-mb-sm">
    <q-icon name="error" size="xs" class="q-mr-xs" />
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string | null;
}>();
</script>
