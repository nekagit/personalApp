<template>
  <div class="card relative z-0 text-wrap p-4 bg-white shadow-xl mx-auto rounded-lg transition-all duration-600 ease-in hover:text-white">
    <h4>{{ title }}</h4>
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps(['content', 'title'])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');

.card {
  border-radius: 10px;
  filter: drop-shadow(0 5px 10px 0 #ffffff);
  width: 100%;
  max-width: 350px;
  height: auto;
  padding: 20px;
  position: relative;
  overflow: hidden;
  z-index: 1; /* Ensure the card is above the ::before element */
}

.card::before {
  content: '';
  position: absolute;
  top: -15px;
  right: -15px;
  background: rgb(33, 42, 88);
  height: 220px;
  width: 25px;
  border-radius: 32px;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 0.25s ease-out;
  z-index: -1; /* Position the ::before element behind the card */
}

.card:hover::before {
  transition-delay: 0.2s;
  transform: scale(40);
}

.card p {
  padding: 10px 0;
}
</style>
