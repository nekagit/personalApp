<template>
  <div class="container">
    <div class="progress" :style="{ width: progressBarWidth }"></div>
  </div>
  <div class="text">
    <p>{{ progressPercentage }}%</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

let progressBarWidth = ref('0%');
let progressPercentage = ref(0);

const interval = setInterval(() => {
  progressPercentage.value += 10;
  progressBarWidth.value = `${progressPercentage.value}%`;

  if (progressPercentage.value >= 100) {
    clearInterval(interval);
  }
}, 1000);
</script>

<style scoped>
.text {
  color: rgb(0, 0, 0);
}
.progress {
  height: 100%;
  background-color: rgb(255, 30, 30);
  border-radius: 10px;
  transition: width 1s;
}
</style>
