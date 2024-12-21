<template>
  <a href="#" class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path :d="icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
    </svg>
    <span>{{ children }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  children: String,
})
</script>
