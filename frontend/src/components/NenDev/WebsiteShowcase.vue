<template>
  <div class="container mx-auto px-4 py-8">
    <SectionHeader
      subtitle="Implementations"
      title="Finished Websites"
      description="Jobs and private tasks until today"
    />

    <div v-if="selectedIndex === null" class="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div
        v-for="(site, index) in websites"
        :key="index"
        class="bg-[#090E19] rounded-lg shadow-lg overflow-hidden w-fit mx-auto"
        @click="selectSite(index)"
      >
        <div class="p-4 cursor-pointer text-center w-[300px]">
          <h3 class="text-2xl font-semibold mb-2 gradientText">{{ site.title }}</h3>
          <p class="text-gray-600 mb-4 text-xl">{{ site.description }}</p>
        </div>
      </div>
    </div>

    <!-- Central display when a website is selected -->
    <div v-else class="central-display relative">
      <div class="absolute top-0 left-0 w-full h-full flex items-center justify-between">
        <button class="arrow left-arrow" @click="previousSite">&#9664;</button>
        <div class="flex-grow mx-auto w-11/12 bg-[#090E19] rounded-lg shadow-lg overflow-hidden">
          <div class="p-4 text-center">
            <h3 class="text-xl font-semibold mb-2 gradientText">
              {{ websites[selectedIndex].title }}
            </h3>
            <p class="text-gray-600 mb-4">{{ websites[selectedIndex].description }}</p>
          </div>
          <iframe
            :src="websites[selectedIndex].url"
            class="w-full h-[80vh] transition-all duration-500"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <button class="arrow right-arrow" @click="nextSite">&#9654;</button>
      </div>

      <!-- X Button for closing the central display -->
      <button class="close-button" @click="closeSite">&#10006;</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SectionHeader from './SectionHeader.vue'
const websites = ref([
  {
    title: 'RY Sport',
    description: 'Profile of personal fitness coach Robin Schroeder',
    url: 'https://rysport.netlify.app',
    showIframe: false
  },
  {
    title: 'Kosta Kalicanin',
    description: 'Profile of soccer player Kosta Kalicanin',
    url: 'https://kostakalicanin.netlify.app',
    showIframe: true
  },
  {
    title: 'Stankovic Art',
    description: 'E-Commerce for selling paintings',
    url: 'https://stankovicart.netlify.app',
    showIframe: false
  },
  {
    title: 'Vukas',
    description: 'Personal portfolio website',
    url: 'https://vukas.netlify.app',
    showIframe: false
  },
  {
    title: 'Stichting SOP Rotterdam',
    description: 'Profile of a sports club in Rotterdam',
    url: 'https://stichtingsoprotterdam.nl',
    showIframe: false
  },
  {
    title: 'DocuVerse',
    description: 'Documentation website of my public knowledge',
    url: 'https://docuverse.netlify.app',
    showIframe: false
  }
])

const selectedIndex = ref(null) // To track the selected website

function selectSite(index) {
  selectedIndex.value = index
}

function previousSite() {
  if (selectedIndex.value === 0) {
    selectedIndex.value = websites.value.length - 1
  } else {
    selectedIndex.value -= 1
  }
}

function nextSite() {
  if (selectedIndex.value === websites.value.length - 1) {
    selectedIndex.value = 0
  } else {
    selectedIndex.value += 1
  }
}

function closeSite() {
  selectedIndex.value = null // Return to the original state
}
</script>

<style scoped>
.central-display {
  position: relative;
  display: flex;
  height: 1000px;
  align-items: center;
  justify-content: center;
}

.arrow {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 2rem;
  z-index: 10;
}

.left-arrow {
  top: 0;
  margin-left: 1rem;
}

.right-arrow {
  top: 0;
  right: 0;
  margin-right: 1rem;
}

.left-arrow:hover,
.right-arrow:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.close-button {
  position: absolute;
  top: 0px;
  right: 50%px;
  background-color: red;
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 20;
}

.close-button:hover {
  background-color: darkred;
}
</style>
