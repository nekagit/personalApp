<template>
  <div class="card">
    <img :src="imgSrc" alt="" class="card-img rounded-3xl shadow-2xl z-max hover:opacity-50 ease-in-out duration-300">
    <div class="card-content">
      <h1>{{ heading }}</h1>
      <p class="truncate">{{ text }}</p>
    </div>
  </div>

</template>

<script setup lang="ts">
interface CardProps {
  heading?: string
  text?: string
  imgSrc: string
}

defineProps<CardProps>()
</script>

<style lang="scss" scoped>
// Colors
$color-primary-white: rgb(0, 0, 0);

.card {
  max-width: 100%; /* Ensure the card does not exceed the container's width */
  height:90vh; /* Allow the height to adjust based on content */
  overflow: auto;
  cursor: pointer;
  position: relative;
  color: $color-primary-white;
  z-index: 10; /* Ensure the card is above other elements */
}

.card-img {
  width: 100%; /* Ensure the image fills the container */
  height: auto; /* Allow the height to adjust based on the image's aspect ratio */
  object-fit: cover;
}


.card-content {
  opacity: 0;
  color: rgb(255, 0, 0);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%; /* Ensure the content spans the entire width of the container */
  padding: 30px; /* Adjust padding for spacing around content */
}

h2 {
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: normal;
  text-transform: uppercase;
}

p {
  opacity: 0;
  max-width: 80%;
  transition: opacity 0.3s ease-out;
}

.card:hover .card-content {
  transition: opacity 0.3s ease-in;
  opacity: 1;
}

</style>
