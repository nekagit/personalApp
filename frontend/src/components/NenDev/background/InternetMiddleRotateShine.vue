<template>
  <div class="gradient"></div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gradient {
  --size: 750px;
  --speed: 50s;
  --easing: cubic-bezier(0.8, 0.2, 0.2, 0.8);
  width: var(--size);
  height: var(--size);
  filter: blur(calc(var(--size) / 5));
  background-image: linear-gradient(hsl(222, 84%, 60%, 100%), rgb(222, 213, 167));
  animation: rotate var(--speed) var(--easing) alternate infinite;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  z-index: 0;
}

@media (min-width: 720px) {
  .gradient {
    --size: 600px;
  }
}

* {
  transition: all 0.5s ease-out;
}

</style>