<template>
  <div class="jumbotron">
    <div class="content-wrapper flex flex-col xl:flex-row xl:max-w-[90%] gap-8">
      <div class="image-container">
        <img :src="imageSrc" alt="Developer portrait" class="portrait-image" />
      </div>
      <div class="text-content">
        <div class="title text-center align-center pb-4">
          <TypeWriter
            class="hidden xl:flex text-center"
            :texts="[title, 'I am a developer', 'Jesus is King!']"
          />
          <div class="flex xl:hidden pb-8">
            <h3 class="hover:text-white">{{ title }}</h3>
          </div>
        </div>
        <p class="description text-black xl:max-w-[80%] mx-auto">{{ description }}</p>
        <div class="button-group">
          <!-- <button class="primary-button" @click="onPrimaryAction">
            {{ primaryButtonText }}
          </button> -->
          <button
            class="secondary-button relative overflow-hidden px-6 py-3 rounded-lg font-bold transition-colors duration-300 bg-white text-black dark:bg-black  dark:text-white border-2 border-black dark:border-white group"
            @click="handleResumeClick"
          >
            <span
              class="relative z-10 transition-colors duration-300 group-hover:text-white dark:group-hover:text-black"
            >
              {{ secondaryButtonText }}
            </span>
            <span
              class="absolute inset-0 bg-black dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import resumePdf from '@/../public/NenadKalicanin.pdf';
import TypeWriter from '@/components/NenDev/TypeWriter.vue';
defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  primaryButtonText: {
    type: String,
    default: 'Resume'
  },
  secondaryButtonText: {
    type: String,
    default: 'Contact'
  }
})

const handleResumeClick = () => {
  const link = document.createElement('a')
  link.href = resumePdf
  link.download = 'Nenad-Kalicanin.pdf'
  link.click()
}
</script>

<style scoped>
.jumbotron {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
}

.image-container {
  flex: 1;
}

.portrait-image {
  width: 90%;
  max-width: 500px;
  height: auto;
  margin: auto;
  margin-top: 3rem;
  object-fit: cover;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.text-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
}

.description {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 2rem;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.description:hover {
  box-shadow: none;
  transform: translateY(5px);
}

.description::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.description:hover::after {
  opacity: 1;
}
.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.primary-button,
.secondary-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}
.primary-button,
.secondary-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.primary-button {
  background-color: rgb(26, 32, 44);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.primary-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: all 0.5s;
}

.primary-button:hover::before {
  left: 100%;
}

.primary-button:hover {
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.2);
}


</style>
