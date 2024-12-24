<!-- <script setup lang="ts">
import type { BaseSection } from '@/components/atoms/sections/ABaseSection.vue';
import { defineProps } from 'vue';

defineProps<BaseSection>();
</script>

<template>
  <div class="container flex flex-row items-start justify-start">
    <div class="p-4 bg-slate-300 mt-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell w-auto h-auto"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
    </div>
    <div class="w-full xl:w-[50%] lg:w-[64%] ">
      <h1 class="font-bold text-xl ">{{ sectionItem.title }}</h1>
      <p v-for="content in sectionItem.content" class="text-slate-400" :key="content">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style> -->
