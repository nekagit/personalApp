<template>
  <div
    class="text-white xl:max-w-[70%] p-8 grid gap-0 mx-auto grid-cols-1 xl:grid-cols-2 blob-container"
  >
    <div>
      <header>
        <h1 class="text-[#c4007a] text-lg">Welcome to my site.</h1>
        <h1 class="text-6xl font-extrabold robot-bold my-2">
          I'm <span class="bg-clip-text text-transparent gradientText">Nenad Kalicanin</span>, a
          Fullstack developer.
        </h1>
        <div class="flex items-center space-x-4 my-4">
          <span class="flex items-center gap-2">
            <Icon icon="logos:vue" width="24" height="24" /> Vue.js</span
          >
          <span class="flex items-center gap-2">
            <Icon icon="logos:react" width="24" height="24" /> React.js</span
          >
          <span class="flex items-center gap-2">
            <Icon icon="mdi:nodejs" width="24" height="24" />Node.js</span
          >
          <span class="flex items-center gap-2">
            <Icon icon="mdi:tailwind" width="24" height="24" />TailwindCSS</span
          >
        </div>
      </header>
      <section class="my-4 roboto xl:max-w-[90%] text-gray-400 leading-relaxed space-y-4">
        <p>
          As an enthusiastic intermediate full-stack developer, I'm on a journey to transform ideas
          into functional web applications. I'm constantly learning and improving my skills in
          Vue.js, React.js and web development. 
        </p>
        <p>
          Explore my growing portfolio of projects and
          articles that demonstrate my progress and passion for coding.
          Currently, I'm learning about React and Vue in the front and Java and Python in the back.
        </p>
      </section>

      <section class="flex space-x-4">
        <button id="hire-me-button" class="px-4 py-2 bg-gray-800 rounded-md shadow__btn">
          Hire me
        </button>
        <button class="btn" @click="handleResumeClick">Resume</button>
      </section>
    </div>

    <div class="flex flex-col mt-16">
      <section class="flex space-x-2 my-4 xl:justify-center flex-wrap gap-2 justify-end">
        <span class="h-fit bg-[#2a6172] px-3 py-1 rounded-md text-sm font-medium text-white"
          >Christian</span
        >
        <span class="h-fit bg-[#255a3b] px-3 py-1 rounded-md text-sm font-medium text-white"
          >Developer</span
        >
        <span class="h-fit bg-[#925131] px-3 py-1 rounded-md text-sm font-medium text-white"
          >Swimmer</span
        >
        <span class="h-fit bg-[#8a2b53] px-3 py-1 rounded-md text-sm font-medium text-white"
          >Serbian</span
        >
        <span class="h-fit bg-[#1f2636] px-3 py-1 rounded-md text-sm font-medium text-white"
          >Diligent worker</span
        >
      </section>
      <section>
        <CodeSnippet />
      </section>
    </div>
  </div>
</template>

<script setup>
import CodeSnippet from '@/components/NenDev/CodeSnippet.vue'
import { Icon } from '@iconify/vue'
import resumePdf from '@/../public/NenadKalicanin.pdf'
import { onMounted } from 'vue'
const handleResumeClick = () => {
  const link = document.createElement('a')
  link.href = resumePdf
  link.download = 'Nenad-Kalicanin.pdf'
  link.click()
}
onMounted(() => {
  const button = document.getElementById('hire-me-button')
  button.addEventListener('click', () => {
    window.location.href =
      'mailto:your-email@example.com?subject=Hiring Inquiry&body=Hello,%0D%0A%0D%0AI am interested in hiring you.'
  })
})
</script>

<style scoped>
.green-glow-blob {
  position: absolute;
  top: -100px;
  left: -150px;
  width: 400px;
  height: 400px;
  background: rgba(34, 197, 94, 0.6); /* Greenish glow color */
  border-radius: 50%;
  filter: blur(120px); /* Heavy blur for glow effect */
  z-index: -1; /* Make sure it's behind the content */
  animation: blobMovement 8s ease-in-out infinite; /* Subtle animation */
}

@keyframes blobMovement {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, 30px);
  }
}

.gradientText {
  background: linear-gradient(90deg, #16d8fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -3px;
}
.shadow__btn {
  padding: 0px 20px;
  border: none;
  font-size: 12px;
  color: #fff;
  border-radius: 7px;
  letter-spacing: 4px;
  font-weight: 700;
  text-transform: uppercase;
  transition: 0.5s;
  transition-property: box-shadow;
}

.shadow__btn {
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  box-shadow: 0 0 25px rgb(0, 140, 255);
}

.shadow__btn:hover {
  box-shadow:
    0 0 5px rgb(0, 140, 255),
    0 0 25px rgb(0, 140, 255),
    0 0 50px rgb(0, 140, 255),
    0 0 100px rgb(0, 140, 255);
}
.btn {
  position: relative;
  font-size: 14px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1em 1.5em;
  display: inline-block;
  border-radius: 2em;
  transition: all 0.2s;
  border: none;
  font-family: inherit;
  font-weight: 500;
  color: black;
  background-color: rgb(255, 255, 255);
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.btn::after {
  content: '';
  display: inline-block;
  height: 100%;
  width: 100%;
  border-radius: 100px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  transition: all 0.4s;
}

.btn::after {
  background-color: #fff;
}

.btn:hover::after {
  transform: scaleX(1.4) scaleY(1.6);
  opacity: 0;
}
</style>
