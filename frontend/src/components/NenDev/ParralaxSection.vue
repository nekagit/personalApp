<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface IProps {
  imgSrc: string
}

defineProps<IProps>()

const parallaxContainer = ref<HTMLElement | null>(null)
const parallaxImage = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (parallaxContainer.value && parallaxImage.value) {
    const scrollPosition = window.pageYOffset
    const containerRect = parallaxContainer.value.getBoundingClientRect()
    const containerTop = containerRect.top + scrollPosition
    const containerBottom = containerTop + containerRect.height
    if (scrollPosition > containerTop - window.innerHeight && scrollPosition < containerBottom) {
      const parallaxSpeed = 0.5 // Adjust this value to change the parallax speed
      const yOffset = (scrollPosition - containerTop) * parallaxSpeed
      parallaxImage.value.style.transform = `translateY(${yOffset}px)`
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="parallaxContainer" class="parallax-container my-16" id="parallax">
    <div ref="parallaxImage" class="parallax-image" :style="{ backgroundImage: `url(${imgSrc})` }"></div>
  </div>
</template>

<style scoped>
.parallax-container {
  position: relative;
  height: 50vh;
  overflow: hidden;
}

.parallax-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>