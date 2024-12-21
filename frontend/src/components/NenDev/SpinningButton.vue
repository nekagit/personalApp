<template>
  <div class="hire-button-container">
    <div class="rotating-text">
      <span
        v-for="(char, index) in text"
        :key="index"
        :style="{ transform: `rotate(${index * rotationAngle}deg)` }"
      >
        {{ char }}
      </span>
    </div>
    <button class="hire-button rounded-full">
      <span><RouterLink to="resume" >Me</RouterLink></span>
      <span><RouterLink to="resume" >Hire</RouterLink></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
const text = ' • Frontend  •  Backend • UI/UX'
const chars = text.split('')
const rotationAngle = computed(() => 360 / text.length)
</script>

<style scoped>
.hire-button-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.rotating-text {
  position: absolute;
  font-weight: bold;
  width: 100%;
  height: 100%;
  animation: spin 10s linear infinite;
}

.rotating-text span {
  position: absolute;
  left: 50%;
  font-size: 13pt;
  transform-origin: 0 75px;
}

.hire-button {
  z-index: 1;
  border: none;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  width: 70px;
  height: 70px;
  font-size: 12pt;
  font-weight: bold;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
}

.hire-button span {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hire-button span:nth-child(1) {
  transform: translateY(-100%);
}

.hire-button:hover {
  background-color: #3498db;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.hire-button:hover span:nth-child(1) {
  transform: translateY(0);
}

.hire-button:hover span:nth-child(2) {
  transform: translateY(100%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media (max-width: 720px) {
  .hire-button-container {
    position: absolute;
    top: 2%;
    right: 20px;
    width: 80px;
    height: 90px;
  }

  .rotating-text {
    width: 100%;
    height: 100%;
  }

  .rotating-text span {
    font-size: 8pt;
    transform-origin: 0 45px; /* Adjusted to position text closer to the button */
  }

  .hire-button {
    width: 50px;
    height: 50px;
    font-size: 10pt;
  }
}
</style>
