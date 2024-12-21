<template>
  <div class="grid grid-cols-1 xl:grid-cols-2 md:container">
    <ImageLanguageSection />
    <div class="text-content my-auto">
      <h1 class="title text-center pb-8 gradientText">{{ title }}</h1>
      <p class="description" v-html="description"></p>
    </div>
  </div>
  <div class="container">
    <PersonalInfoSection />
  </div>
</template>

<script setup>
import ImageLanguageSection from './ImageLanguageSection.vue'
import PersonalInfoSection from './PersonalInfoSection.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})
</script>
<style scoped>
.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.description {
  line-height: 1.6;
  color: #34495e;
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  background: rgb(236, 236, 236);
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  box-shadow: 0 15px 100px #fa1ba5;
  /* box-shadow: 0 15px 400px rgba(27, 121, 230, 0.507); */
}

.description:hover {
  transform: translateY(-5px);
  box-shadow: none;
}

.button-group {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-button,
.secondary-button {
  padding: 0.8rem 1.5rem;
}
</style>
