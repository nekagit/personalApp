<script setup lang="ts">
import StartJumbotron from "@/components/NenDev/StartJumbotron.vue";
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<script setup>

</script>
<template>
 <!-- <Jumbotron
    :imageSrc="Nenad"
    title="Implementing and Refining any Ui/UX Ideas."
    description="As an enthusiastic intermediate full-stack developer, I'm on a journey to transform ideas into functional web applications. I'm constantly learning and improving my skills in Vue.js, React.js and web development. Explore my growing portfolio of projects and articles that demonstrate my progress and passion for coding."
    primaryButtonText="Contact"
    secondaryButtonText="Resume"
    @secondaryAction="handleContactClick"
  /> -->
<div class="mb-64 md:mb-44">

  <StartJumbotron/>
</div>

</template>
