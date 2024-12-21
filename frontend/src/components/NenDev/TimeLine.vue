<template>
  <SectionHeader
    subtitle="TimeLine"
    title="Carrier Overview"
    description="Jobs and Working contracts until today"
  />

  <div class="timeline" ref="timelineRef">
    <div v-for="(item, index) in timelineItems" :key="index" class="timeline-item">
      <div class="timeline-dot-container">
        <svg class="timeline-dot" width="40" height="40">
          <circle cx="20" cy="20" r="18" fill="transparent" stroke="#1a1a1a" stroke-width="2" />
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="transparent"
            stroke="#3b82f6"
            stroke-width="2"
            :stroke-dasharray="2 * Math.PI * 18"
            :stroke-dashoffset="getDashOffset(index)"
          />
          <circle cx="20" cy="20" r="6" :fill="getFillColor(index)" />
        </svg>
        <div v-if="index < timelineItems.length - 1" class="timeline-line">
          <div class="timeline-line-fill" :style="{ height: getLineHeight(index) + '%' }"></div>
        </div>
      </div>
      <div class="timeline-content">
        <p class="timeline-date">{{ item.date }}</p>
        <h3 class="text-2xl gradientText2">{{ item.title }}</h3>
        <p class="text-black dark:text-white w-[75%]">{{ item.description }}</p>
      </div>
      <div class="timeline-logo hidden md:flex">
        <a target="_blank" href="https://www.linkedin.com/in/nenad-kalicanin-23924119a/">
          <img
            :src="item.logo"
            :alt="item.title + ' logo'"
            class="rounded-full w-16 h-16 object-cover"
          />
        </a>
      </div>
    </div>
  </div>
  <QuoteSection />
</template>

<script setup lang="ts">
import bytescoding from '@/assets/bytescoding.jpeg'
import decathlon from '@/assets/decathlon.jpg'
import kaufland from '@/assets/kaufland.png'
import masterschool from '@/assets/masterschool.jpeg'
import orgatech from '@/assets/orgatech.jpeg'
import qmbase from '@/assets/qmbase.jpeg'
import serviceamgast from '@/assets/serviceamgast.jpg'
import { onMounted, onUnmounted, ref } from 'vue'
import QuoteSection from './QuoteSection.vue'
import SectionHeader from './SectionHeader.vue'

const timelineRef = ref()
const scrollProgress = ref(0)

const timelineItems = [
  {
    title: 'MasterSchool',
    date: 'Mentor (Freelancer) | October 2024 - Present',
    description:
      'Tracking Learning Progress of Participants and assisting them in any way necessary.',
    logo: masterschool
  },
  {
    title: 'bytes Coding GmbH',
    date: 'Software Developer (Freelancer) | June 2024 - Present',
    description:
      'Working on various software development projects, utilizing skills in full-stack web development, React, TypeScript, and more.',
    logo: bytescoding
  },
  {
    title: 'qmBase-Dortmund',
    date: 'Software Developer | January 2023 – March 2024',
    description:
      'Developed full-stack web applications using React, TypeScript, ASP.Net, and Azure DevOps. Contributed to the development and maintenance of complex web solutions.',
    logo: qmbase
  },
  {
    title: 'OrgaTech Solution Engineering Consulting GmbH',
    date: 'Software Developer | January 2021 – December 2022',
    description:
      'Worked on Java backend development integrated with HTML, CSS, and JavaScript for frontend solutions. Also involved in Flutter mobile development.',
    logo: orgatech
  },
  {
    title: 'Decathlon-Dortmund',
    date: 'Order Picker | 2020 – 2021',
    description:
      'Responsible for efficiently picking and packing orders, ensuring timely and accurate delivery of products.',
    logo: decathlon
  },
  {
    title: 'Service am Gast GmbH-Dortmund',
    date: 'Waiter/Bartender | 2017 – 2020',
    description:
      'Provided excellent customer service in a fast-paced environment, managing orders and ensuring a high-quality dining experience.',
    logo: serviceamgast
  },
  {
    title: 'Kaufland-Dortmund',
    date: 'Newspaper Delivery | 2015 – 2017',
    description:
      'Delivered newspapers to customers on time, maintaining a reliable and efficient delivery route.',
    logo: kaufland
  }
]

const updateScrollProgress = () => {
  if (!timelineRef.value) return
  const rect = timelineRef.value.getBoundingClientRect()
  const scrollPercentage = Math.max(
    0,
    Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight))
  )
  scrollProgress.value = scrollPercentage
}

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress)
  updateScrollProgress()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})

const getDashOffset = (index: number) => {
  const adjustedProgress = Math.min(1, scrollProgress.value * 1.2)
  const itemProgress = Math.max(0, Math.min(1, adjustedProgress * timelineItems.length - index))
  return 2 * Math.PI * 18 * (1 - itemProgress)
}

const getLineHeight = (index: number) => {
  const adjustedProgress = Math.min(1, scrollProgress.value * 1.2)
  const itemProgress = Math.max(
    0,
    Math.min(1, adjustedProgress * timelineItems.length - index - 0.5)
  )
  return itemProgress * 100
}

const getFillColor = (index: number) => {
  const adjustedProgress = Math.min(1, scrollProgress.value * 1.2)
  const itemProgress = Math.max(0, Math.min(1, adjustedProgress * timelineItems.length - index))
  return itemProgress >= 1 ? '#3b82f6' : 'transparent'
}
</script>

<style scoped>
@media (max-width: 720px) {
  .timeline {
}
}

.sectionHeader {
  box-shadow: 0 15px 400px rgba(27, 121, 230, 0.507);
}
.timeline-dot circle {
  transition: fill 0.3s ease;
}
.timeline {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: #ffffff;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  font-family: 'Georgia', sans-serif;
  margin-bottom: 40px;
}

.timeline-dot-container {
  position: relative;
  margin-right: 20px;
  margin-bottom: 200px;
}

.timeline-item:last-child .timeline-dot-container {
  position: relative;
  margin-right: 20px;
  margin-bottom: 0;
}


.timeline-line {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: calc(100% + 200px);
  overflow: hidden;
}

.timeline-line-fill {
  width: 100%;
  height: 0;
  background: linear-gradient(90deg, #16d8fa, #3b82f6);
  transition: height 0.3s ease;
}

.timeline-content {
  flex: 1;
}

.timeline-content h3 {
  font-family: 'Georgia', sans-serif;
  font-weight: 700;
  margin-bottom: 5px;
}

.timeline-date {
  color: #888888;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.timeline-logo {
  margin-left: 20px;
  flex-shrink: 0;
}

.timeline-logo img {
  border: 2px solid #3b82f6;
  transition: transform 0.3s ease;
}

.timeline-logo img:hover {
  transform: scale(1.1);
}
</style>
