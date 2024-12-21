<script setup lang="ts">
import Life from '@/../public/life.jpg'
import Biography from '@/components/NenDev/Biography.vue'
import ParralaxSection from '@/components/NenDev/ParralaxSection.vue'
import SkillGrid from '@/components/NenDev/SkillGrid.vue'
import TimeLine from '@/components/NenDev/TimeLine.vue'
import { onMounted } from 'vue'
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
</script>

<template>
  <div class="container">
    <Biography
      title="Dear Visitor."
      description="Hi, I’m Nenad Kalicanin from Dortmund. You can reach me at njoco@hotmail.de. Check out some of my work on GitHub at <strong>nekagit</strong>. I’m a seasoned software developer with experience as a Freelancer at <strong>bytes Coding GmbH</strong> and was last employed at <strong>qmBase</strong> in Dortmund. My background includes full-stack web development, backend and frontend technologies, and mobile app development. I've also worked at <strong>OrgaTech Solution Engineering Consulting GmbH</strong> in Lünen, enhancing my expertise in Java and web technologies. I will hold a Bachelor's degree in Computer Science after August from the Technical University of Dortmund. My skills include <strong>.NET</strong>, <strong>JavaScript</strong>, <strong>React</strong>, <strong>Docker</strong>, and <strong>DevOps</strong>, among others. I am very communicative and love languages, thus adding Turkish to my repertoire. I’m proficient in <strong>German</strong>, <strong>English</strong>, <strong>Serbian</strong>, and <strong>Spanish</strong>, and I also have a forklift license."
    />
  </div>

    <ParralaxSection :imgSrc="Life" />

    <TimeLine />
  <div class="container">

    <SkillGrid />
    <!-- <AbilitySection /> -->
  </div>

</template>
