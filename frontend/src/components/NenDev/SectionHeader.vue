<template>
  <div class="section-header my-32 px-4 max-w-4xl mx-auto">
    <p class="subtitle mb-2">{{ subtitle }}</p>
    <h1 class="title mb-6">{{ title }}</h1>
    <p class="description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  subtitle: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
});
</script>

<style scoped>
.section-header {
  text-align: center;
  position: relative;
}

.section-header::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #c4007a, #ff69b4);
  border-radius: 2px;
}

.subtitle {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #888;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(90deg, #c4007a, #ff69b4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  line-height: 1.2;
  position: relative;
  display: inline-block;
}

.title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #c4007a, #ff69b4);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.section-header:hover .title::after {
  transform: scaleX(1);
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
}

:global(.dark) .description {
  color: #f5f5f5;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .description {
    font-size: 1rem;
  }
}
</style>