<template>
  <div class="card">
    <img :src="imgSrc" alt="asdf" />
    <div class="card__content grid place-content-center">
      <h1 class="card__title text-wrap text-center text-3xl text-bold">{{ title }}</h1>
      <!-- <p class="card__description text-wrap" v-html="formattedDescription"></p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  imgSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const formattedDescription = computed(() => {
  return props.description.replace(/\n/g, '<br>')
}) 
</script>

<style scoped>
.card {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #313131;
  perspective: 1000px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
}
.card img{
width:100%;
height: 100%;
}
.card__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #313131;
  overflow-y: auto;
  transform: rotateX(-90deg);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card:hover .card__content {
  transform: rotateX(0deg);
}

.card__title {
  margin: 0;
  font-weight: 700;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #34495e;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card__description {
  margin: 10px 0 0;
  font-size: 14px;
  color: #777;
  line-height: 1.4;
}
</style>
