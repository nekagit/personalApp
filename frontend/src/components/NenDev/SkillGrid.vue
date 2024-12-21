<template>
    <SectionHeader
    subtitle="Technologies"
    title="Tech-Stack"
    description="Frontend and Backend Frameworks and Tools"
  />
  <div class="tech-grid">
    <div class="tech-row">
      <!-- <h2 class="row-title gradientText2">Frontend</h2> -->
      <div class="tech-items-container">
        <div class="tech-items move-left-to-right">
          <div
            v-for="tech in [...frontendTech, ...frontendTech]"
            :key="`${tech.name}`"
            class="tech-item"
            @mouseover="showModal(tech.name)"
            @mouseleave="hideModal"
          >
            <Icon :icon="tech.icon" class="tech-icon" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tech-row">
      <!-- <h2 class="row-title gradientText2">Backend, Database and Tools</h2> -->
      <div class="tech-items-container">
        <div class="tech-items move-right-to-left">
          <div
            v-for="tech in [...backendTech, ...databaseTech, ...toolsTech,...backendTech, ...databaseTech, ...toolsTech]"
            :key="`${tech.name}`"
            class="tech-item"
            @mouseover="showModal(tech.name)"
            @mouseleave="hideModal"
          >
            <Icon :icon="tech.icon" class="tech-icon" />
            <span class="tech-name">{{ tech.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import SectionHeader from './SectionHeader.vue';
interface Technology {
  name: string
  icon: string
  rating: number
  type: 'frontend' | 'backend' | 'database' | 'tools'
}

const activeTech = ref<string | null>(null)

const showModal = (name: string) => {
  activeTech.value = name
}

const hideModal = () => {
  activeTech.value = null
}

const technologies = ref<Technology[]>([
  { name: 'Vue', icon: 'logos:vue', rating: 8, type: 'frontend' },
  { name: 'React', icon: 'logos:react', rating: 6, type: 'frontend' },
  { name: 'Javascript', icon: 'logos:javascript', rating: 6, type: 'frontend' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', rating: 6, type: 'frontend' },
  { name: 'HTML', icon: 'logos:html-5', rating: 8, type: 'frontend' },
  { name: 'CSS', icon: 'logos:css-3', rating: 7, type: 'frontend' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', rating: 7, type: 'frontend' },
  { name: 'Bootstrap', icon: 'logos:bootstrap', rating: 7, type: 'frontend' },
  { name: 'Sass', icon: 'logos:sass', rating: 5, type: 'frontend' },
  { name: 'Python', icon: 'logos:python', rating: 5, type: 'backend' },
  { name: 'Java', icon: 'logos:java', rating: 5, type: 'backend' },
  { name: 'Express', icon: 'simple-icons:express', rating: 5, type: 'backend' },
  { name: 'NodeJS', icon: 'logos:nodejs-icon', rating: 5, type: 'backend' },
  { name: 'MySQL', icon: 'logos:mysql', rating: 6, type: 'database' },
  { name: 'Mongo DB', icon: 'logos:mongodb-icon', rating: 7, type: 'database' },
  { name: 'MSSQL', icon: 'devicon:microsoftsqlserver-wordmark', rating: 6, type: 'database' },
  { name: 'Postman', icon: 'simple-icons:postman', rating: 4, type: 'tools' },
  { name: 'Docker', icon: 'logos:docker-icon', rating: 7, type: 'tools' },
  { name: 'Git', icon: 'logos:git-icon', rating: 7, type: 'tools' },
  { name: 'Linux', icon: 'simple-icons:linux', rating: 4, type: 'tools' },
])

const frontendTech = computed(() => technologies.value.filter((tech) => tech.type === 'frontend'))
const backendTech = computed(() => technologies.value.filter((tech) => tech.type === 'backend'))
const databaseTech = computed(() => technologies.value.filter((tech) => tech.type === 'database'))
const toolsTech = computed(() => technologies.value.filter((tech) => tech.type === 'tools'))
</script>


<style scoped>
.tech-grid {
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.tech-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.row-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff;
}

.tech-items-container {
  overflow: hidden;
  width: 100%;
}

.tech-items {
  display: flex;
  gap: 24px;
  width: fit-content;
}

.move-left-to-right {
  animation: moveLeftToRight 20s linear infinite;
}

.move-right-to-left {
  animation: moveRightToLeft 20s linear infinite;
}

@keyframes moveLeftToRight {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes moveRightToLeft {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.tech-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 0 0 auto;
  width: 150px;
  height: 130px;
  background-color: rgba(0, 0, 0, 0);
  padding: 1.5rem;
  margin: auto;
  border-radius: 15%;
  transition: background-color 0.3s ease;
}

.tech-item:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.tech-icon {
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-bottom: 10px;
}

.tech-name {
  font-size: 14px;
  color: #ffffff;
}

.modal {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: #ffffff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
}

.tech-item:hover .modal {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Ensure animations continue on hover */
.tech-items-container:hover .tech-items {
  animation-play-state: running !important;
}

/* Pause the animation when hovering over the tech-row */
.tech-row:hover .move-left-to-right,
.tech-row:hover .move-right-to-left {
  animation-play-state: paused;
}

</style>