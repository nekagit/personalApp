<template>
  <div v-if="isVisible" :class="{'loading-screen': true, 'fade-out': !isVisible}">
    <img src="./../../public/N.png" alt="Logo" class="logo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(true);

onMounted(() => {
  // Simulate a delay before hiding the loading screen
  setTimeout(() => {
    isVisible.value = false;
  }, 4000); // Adjust the delay time as needed
});
</script>


<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 2s ease-out; /* Smooth fade-in and fade-out */
}

.fade-out {
  opacity: 0;
}

.logo {
  width: 150px; /* Adjust size as needed */
  height: auto;
  animation: rotate-scale 3s;
}

@keyframes rotate-scale {
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(360deg) scale(1.5); /* Rotate 360 degrees and scale up */
  }
    70% {
    transform: rotate(180deg) scale(1); /* Rotate 360 degrees and scale up */
  }
    80% {
    transform: rotate(360deg) scale(1.5); /* Rotate 360 degrees and scale up */
  }
  90% {
    transform: rotate(720deg) scale(5); /* Rotate 720 degrees and scale back to original size */
  }
    100% {
    transform: rotate(720deg) scale(0); /* Rotate 720 degrees and scale back to original size */
  }
}
</style>
