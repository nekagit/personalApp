<template>
  <div class="card shadow-xl relative xl:max-w-l">
    <div class="header flex justify-between items-center">
      <!-- Circles on the left -->
      <div class="flex space-x-1 items-center">
        <div class="circle red"></div>
        <div class="circle yellow"></div>
        <div class="circle green"></div>
      </div>

      <!-- Centered title -->
      <p class="text-center" id="title2">index.tsx</p>

      <!-- Copy SVG icon on the right -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        class="h-5 w-5"
      >
        <path
          fill-rule="evenodd"
          d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
          clip-rule="evenodd"
        ></path>
        <path
          d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z"
        ></path>
        <path
          d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z"
        ></path>
      </svg>
    </div>
    <div class="code-container">
      <pre class="language-jsx">
        <code class="language-jsx">
import { FC } from "react";

type WelcomeProps = {
  uses:
    | "master current tech"
    | "display my skills"
    | "find freelancing opportunities"
    | "find a part-time job";
};

export const Greetings = ({ application }) => {
  return (
    <div>
      <h1>Welcome fellow Visitor.</h1>
      <p>
        I use this site to <em>{application}</em>.
      </p>
    </div>
  );
};

export default Greetings;
        </code>
      </pre>
    </div>
    <div
      class="bg-gray-800 h-fit text-white p-4 rounded-lg shadow-md max-w-sm absolute xl:-bottom-28 xl:-left-52 md:top-24 md:-right-6 xl:top-auto xl:-right-auto bouncing-element"
    >
      <div class="flex items-center">
        <img
          src="/src/assets/NenadOG.jpg"
          alt="Profile Picture"
          class="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 class="font-bold text-lg">Nenad Kalicanin</h2>
          <span class="text-sm text-gray-300">@nenadkal</span>
        </div>
        <button class="ml-auto px-4 py-2 rounded-2xl bg-[#3855a5c7] text-white hover:bg-blue-700">
         <a href="https://www.instagram.com/nenadkal/">Follow</a> 
        </button>
      </div>
      <p class="mt-3 text-gray-400">
        Hello! I'm exploring the world of development and eager to connect with fellow developers.
        Looking forward on collaborating on
        exciting projects 🌟
      </p>
      <div class="flex justify-between mt-4 text-sm">
        <span>180 Following</span>
        <span>377 Followers</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-tomorrow.css'
import { onMounted } from 'vue'

onMounted(() => {
  Prism.highlightAll()
})
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0); /* Initial position */
  }
  50% {
    transform: translateY(-33px); /* Move up by 10px */
  }
}

.bouncing-element {
  /* background: linear-gradient(90deg, #06b6d4, #3b82f6); */
  box-shadow: 0 0 25px rgba(0, 140, 255, 0.363);
  border: 1px solid rgba(255, 255, 255, 0.24);
  animation: float 6s ease-in-out infinite; /* Animation duration and infinite loop */
}

.card {
  height: 400px;
  margin: 0 auto;
  width: 100%;
  background-color: #0f172a;
  border-radius: 12px;
  padding: 0.1rem;
  transition: 0.5s;
  border: 1px solid rgba(190, 151, 253, 0.185);
}

.header {
  align-items: center;
  padding: 1rem 0.5rem;
  border-radius: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.233);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}

#title2 {
  color: white;
  font-size: 15px;
}

.code-container {
  text-align: center;
}

pre {
  width: 100%;
  height: 350px;
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}

pre code {
  color: white;
}

/* Custom Prism styles */
.token.keyword {
  color: red !important;
}

.token.operator {
  color: #56b6c2 !important;
}

.token.string {
  color: #98c379 !important;
}
</style>
