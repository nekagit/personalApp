<template>
  <footer class="footer-container" :class="{ 'visible': isVisible }">
    <div class="footer-content bg-[#00000062] p-8 rounded-2xl hover:bg-black transition-all duration-500">
      <div class="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center text-center font-bold">
        <div>
          <a href="mailto:nenad99@hotmail.de" class="opacity-60 hover:text-blue-300">nenad99@hotmail.de</a>
        </div>
        <p class="opacity-60">&copy; 2024 Nenad Kalicanin.</p>
        <p>
          Inspired by
          <a target="_blank" class="underline underline-offset-2" href="https://devdreaming.com">CodeBucks</a>
        </p>
        <p>
          Inspired by
          <a target="_blank" class="underline underline-offset-2" href="https://flext.dev/">Felix Tellmann</a>
        </p>
        <div class="flex items-center space-x-4">
          <div class="space-x-8 flex xl:hidden">
            <a
              href="https://www.linkedin.com/in/nenad-kalicanin-23924119a/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon linkedin"
            >
              <Icon icon="mdi:linkedin" />
            </a>
            <a
              href="https://github.com/nekagit"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon github"
            >
              <Icon icon="mdi:github" />
            </a>
            <a
              href="https://www.instagram.com/nenadkal/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon instagram"
            >
              <Icon icon="mdi:instagram" />
            </a>
            <a
              href="https://www.pinterest.de/kalicanin1137/"
              target="_blank"
              rel="noopener noreferrer"
              class="social-icon pinterest"
            >
              <Icon icon="mdi:pinterest" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ABaseHorizontalSection from '../atoms/sections/ABaseHorizontalSection.vue';

const isVisible = ref(false);

const checkScroll = () => {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Show footer when we're close to the bottom (e.g., within 50px)
  isVisible.value = (windowHeight + scrollTop >= documentHeight - 50);
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll);
  // Initial check
  checkScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
  window.removeEventListener('resize', checkScroll);
});
</script>

<style lang="css" scoped>
.footer-container {
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
}

.footer-container.visible {
  opacity: 1;
  pointer-events: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>