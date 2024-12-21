<template>
  <div class="w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
    <ACompanyHeader />
    <ANavigationLinks />
    <div class="flex-1"></div>
    <OUserNavigation />
  </div>
</template>

<script setup lang="ts">
import ACompanyHeader from '../atoms/ACompanyHeader.vue';
import ANavigationLinks from '../atoms/ANavigationLinks.vue';
import OUserNavigation from './OUserNavigation.vue';

</script>
