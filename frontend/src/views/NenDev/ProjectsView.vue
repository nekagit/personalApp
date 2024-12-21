<script setup>
import CodePic from '@/../public/code.jpg'
import ParralaxSection from '@/components/NenDev/ParralaxSection.vue'
import ProjectCard from '@/components/NenDev/ProjectCard.vue'
import WebsiteShowcase from '@/components/NenDev/WebsiteShowcase.vue'
import SectionHeader from '@/components/NenDev/SectionHeader.vue'
import { onMounted, ref } from 'vue'
// Sample card data
const cards = ref([
   {
    title: 'ChatBot on Server',
    description:
      'Using AnythingLLM, LLama 3.1 and a cloud Linux Server enabled ChatBot for Medical Application of customer',
    technology: 'TypeScript, HTML, CSS',
    codeLink: '',
    imgSrc: CodePic
  },
   {
    title: 'WebApp Survey',
    description:
      'WebApp on AWS deployed for customer company private survey tool',
    technology: 'Python, React, JavaScript',
    codeLink: '',
    imgSrc: CodePic
  },
  {
    title: 'WebApp TimeIT',
    description:
      'My own WebApp. Measuring working time and enabling several features like spread sheet generation',
    technology: 'NodeJS, React, TypeScript',
    codeLink: 'https://github.com/timeIT',
    imgSrc: CodePic
  },
  {
    title: 'WebApp OrgaTech',
    description:
      'I worked for 2 years on the application of OrgaTech as a Working Student.(I don not claim its my application or work! All rights reserved to OrgaTech/Adesso)',
    technology: 'Java, Flutter, Javascript',
    codeLink: 'https://github.com/nekagit',
    imgSrc: CodePic
  },
  {
    title: 'WebApp qmBase',
    description:
      'I worked for 1 year on the application of qmbase.com as a Working Student.(I don not claim its my application or work! All rights reserved to qmBase)',
    technology: 'React, C#, TypeScript',
    codeLink: 'https://github.com/qmBase/docs',
    imgSrc: CodePic
  },
  {
    title: 'ArtPage',
    description: 'E-Commerce for selling paintings.  www.stankovicart.com ',
    technology: 'Vue, TypeScript',
    codeLink: 'https://github.com/nekagit/VueProfileArtPage',
    imgSrc: CodePic
  },
  {
    title: 'ProfilePage',
    description: 'Profile of a sports club in Rotterdam. www.stichtingsoprotterdam.nl ',
    technology: 'Angular, TypeScript',
    codeLink: 'https://github.com/nekagit/soprotterdam',
    imgSrc: CodePic
  },
  {
    title: 'ProfilePage',
    description: 'Profile of a soccer player Kosta Kalicanin. kostakalicanin.netlify.app ',
    technology: 'Vue, TypeScript',
    codeLink: 'kostakalicanin.netlify.app',
    imgSrc: CodePic
  },
  {
    title: 'ProfilePage',
    description: 'Profile of a personal fitness coach Robin Schroeder, rysport.netlfiy.app ',
    technology: 'Vue, TypeScript',
    codeLink: 'rysport.netlfiy.app',
    imgSrc: CodePic
  },
  {
    title: 'Simple ChatBot Extension',
    description:
      'An extension that can be connected to local llama3 or directly communicate with OpenAI, to feed PDFs of current website for query.(BachelorThesis)',
    technology: 'Javascript',
    codeLink: 'https://github.com/nekagit/BASimpleChatBotExtension',
    imgSrc: CodePic
  },
  {
    title: 'Leaflet Map with MySQL Data',
    description: 'Different Markers shown on Map regarding Package details.',
    technology: 'Vue, TypeScript',
    codeLink: 'https://github.com/nekagit/LeafletMySQLVue',
    imgSrc: CodePic
  },
  {
    title: 'DocuVerse: Documentation Website',
    description: 'Knowledge i gathered on one place.',
    technology: 'React, Docusaurus',
    codeLink: 'https://github.com/nekagit/docuVerse',
    imgSrc: CodePic
  }
])

// Ref for the container of project cards
const projectContainer = ref(null)
// Scroll to top on mount and setup Intersection Observer
onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }
  )

  // Observe each project card
  if (projectContainer.value) {
    const projectCards = projectContainer.value.querySelectorAll('.projectCard')
    projectCards.forEach((card) => {
      observer.observe(card)
    })
  }
})
</script>

<template>
     <SectionHeader
    subtitle="Implementations"
    title="Finished Projects"
    description="Jobs and private tasks until today"
  />

  <div ref="projectContainer" class="grid grid-cols-1 xl:grid-cols-3 place-content-center mx-auto gap-8 pt-8">
    <ProjectCard
      v-for="(card, index) in cards"
      class="projectCard"
      :key="index"
      :title="card.title"
      :stars="card.stars"
      :description="card.description"
      :technology="card.technology"
      :codeLink="card.codeLink"
    />
  </div>
  <ParralaxSection :imgSrc="CodePic" />

  <!-- Add this line to include the new WebsiteShowcase component -->
  <WebsiteShowcase />
</template>

<style scoped>
.projectCard {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
}

.projectCard.fade-in {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.projectCard:hover {
  box-shadow: none;
  transform: translateY(5px);
}

.projectCard::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.projectCard:hover::after {
  opacity: 1;
}
</style>
