<template>
  <div class="book mx-auto">
    <div class="card text-center relative">
      <div class="tech-icons">
        <Icon
          v-for="tech in technologyIcons"
          :key="tech.name"
          :icon="tech.icon"
          width="48"
          height="48"
        />
      </div>

      <p class="description">{{ description }}</p>
      <p class="technology">
        {{
          technology
            .split(',')
            .map((t) => t.trim())
            .join(', ')
        }}
      </p>
      <p class="codeLink">
        <a :href="codeLink" target="_blank" rel="noopener noreferrer">View</a>
      </p>
      <div class="cover">
        <h3 class="title">{{ title }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technology: {
    type: String,
    required: true
  },
  codeLink: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  }
})

interface Technology {
  name: string
  icon: string
  type: 'frontend' | 'backend'
}

const technologies = ref<Technology[]>([
  { name: 'Java', icon: 'logos:java', type: 'frontend' },
  { name: 'Vue', icon: 'logos:vue', type: 'frontend' },
  { name: 'Angular', icon: 'logos:angular-icon', type: 'frontend' },
  { name: 'Javascript', icon: 'logos:javascript', type: 'frontend' },
  { name: 'HTML', icon: 'logos:html-5', type: 'frontend' },
  { name: 'CSS', icon: 'logos:css-3', type: 'frontend' },
  { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', type: 'frontend' },
  { name: 'Bootstrap', icon: 'logos:bootstrap', type: 'frontend' },
  { name: 'Sass', icon: 'logos:sass', type: 'frontend' },
  { name: 'Flutter', icon: 'logos:flutter', type: 'frontend' },
  { name: 'Python', icon: 'logos:python', type: 'backend' },
  { name: 'Docker', icon: 'logos:docker-icon', type: 'backend' },
  { name: 'Git', icon: 'logos:git-icon', type: 'backend' },
  { name: 'Express', icon: 'simple-icons:express', type: 'backend' },
  { name: 'NodeJS', icon: 'logos:nodejs-icon', type: 'backend' },
  { name: 'MySQL', icon: 'logos:mysql', type: 'backend' },
  { name: 'Mongo DB', icon: 'logos:mongodb-icon', type: 'backend' },
  { name: 'MSSQL', icon: 'devicon:microsoftsqlserver-wordmark', type: 'backend' },
  { name: 'Postman', icon: 'simple-icons:postman', type: 'backend' },
  { name: 'C#', icon: 'logos:dotnet', type: 'backend' },
  { name: 'React', icon: 'logos:react', type: 'frontend' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', type: 'frontend' },


])

const technologyIcons = computed(() => {
  const techArray = props.technology.split(',').map((tech) => tech.trim())
  return technologies.value.filter((tech) => techArray.includes(tech.name))
})
</script>

<style scoped>
.book {
  position: relative;
  border-radius: 10px;
  max-width: 300px;
  width: 100%;
  max-height: 300px;
  height: 100%;
  background-color: dark;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.cover {
  top: 0;
  left: 0;
  position: absolute;
  background-color:rgb(0, 0, 0);
   box-shadow: 0 0 25px rgba(0, 140, 255, 0.363);
  border: 1px solid rgba(255, 255, 255, 0.24);
  width: 100%;
  height: 100%;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  overflow: hidden;
}

.book:hover .cover {
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  -webkit-transform: rotatey(-90deg);
  -ms-transform: rotatey(-90deg);
  transform: rotatey(-90deg);
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #0f172a;
  color: white;
  border-radius: 8px;
  height: 100%;
  max-height: 300px;
  max-width: 300px;
  transition: all 0.3s ease;
  padding: 1rem;
}

.card-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.tech-icons {
  position: absolute;
  top: -1.5rem;
  left: -1rem;
  width: 80px;
  height: 80px;
}

.tech-icons :deep(svg) {
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 4px;
  padding: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  /* background-color: rgba(0, 0, 0, 0.63); */
  transition: transform 0.3s ease;
  transform-origin: bottom right;
}

/* Staggered movement and rotation */
.tech-icons svg:nth-child(1) {
  margin-right: 5px;
  transform: rotate(-10deg);
  z-index: 5;
}

.tech-icons svg:nth-child(2) {
  margin-right: 15px;
  transform: rotate(-25deg);
  z-index: 4;
}

.tech-icons svg:nth-child(3) {
  margin-right: 25px;
  transform: rotate(-40deg);
  z-index: 3;
}

.tech-icons svg:nth-child(4) {
  margin-right: 20px;
  transform: rotate(-15deg);
  z-index: 2;
}

.tech-icons svg:nth-child(5) {
  margin-right: 20px;
  transform: rotate(-15deg);
  z-index: 1;
}

/* Staggered movement and rotation */
.tech-icons svg:nth-child(1):hover {
  transform: rotate(0deg) translate(-5px, -5px) !important;
  z-index: 6;
  background-color: rgba(0, 0, 0);
}

.tech-icons svg:nth-child(2):hover {
  transform: rotate(0deg) translate(-5px, -5px) !important;
  z-index: 6;
  background-color: rgba(0, 0, 0);
}

.tech-icons svg:nth-child(3):hover {
  transform: rotate(0deg) translate(-5px, -5px) !important;
  z-index: 6;
  background-color: rgba(0, 0, 0);
}

.tech-icons svg:nth-child(4):hover {
  transform: rotate(0deg) translate(-5px, -5px) !important;
  z-index: 6;
  background-color: rgba(0, 0, 0);
}

.tech-icons svg:nth-child(5):hover {
  transform: rotate(0deg) translate(-5px, -5px) !important;
  z-index: 6;
  background-color: rgba(0, 0, 0);
}
.title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
  padding: 1rem;
  padding-bottom: 0;
  color: white;
}

.description {
  color: white;
  font-size: 1rem;
  padding: 1.5rem;
}

.technology {
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  color: #aaa;
}

.codeLink a {
  font-size: 0.875rem;
  color: #1e90ff;
  text-decoration: none;
}

.codeLink a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .card {
    max-width: 100%;
    margin: 0.5rem auto;
    padding: 0.75rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .description,
  .technology,
  .codeLink a {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .card {
    padding: 0.5rem;
  }

  .title {
    font-size: 1rem;
  }

  .description,
  .technology,
  .codeLink a {
    font-size: 0.75rem;
  }
}
</style>
