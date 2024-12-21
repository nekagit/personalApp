<script setup lang="ts">
import PhotoStack from '@/components/NenDev/PhotoStack.vue';
import { onMounted } from 'vue';
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <div class="md:h-screen mb-44 md:mb-0">

    <PhotoStack/>
  </div>
</template>
