<template>
 <div>
    <template v-if="variant === 1">
      <AInternetButtonBordered @click="toggleContent" :title="title" />

      <transition name="fade">
        <div v-if="showContent" class="text-xl card example-1 shadow-xl">
          <div class="text-2xl"></div>
          <div class="inner">
            {{ content }}
          </div>
        </div>
      </transition>
    </template>

    <template v-if="variant === 2">
      <AInternetButtonBordered @click="toggleContent" :title="title" />
      <transition name="fade">
        <div v-if="showContent" class="text-xl card example-2 shadow-xl">
          <div class="text-2xl"></div>
          <div class="inner">
            {{ content }}
          </div>
        </div>
      </transition>
    </template>

    <template v-if="variant === 3">
      <AInternetButtonBordered @click="toggleContent" :title="title" />
      <transition name="fade">
        <div v-if="showContent" class="text-xl card example-3 shadow-xl">
          <div class="text-2xl"></div>
          <div class="inner">
            {{ content }}
          </div>
        </div>
      </transition>
    </template>

    <template v-if="variant === 4">
      <AInternetButtonBordered @click="toggleContent" :title="title" />
      <transition name="fade">
        <div v-if="showContent" class="text-xl card example-4 shadow-xl">
          <div class="text-2xl"></div>
          <div class="inner">
            {{ content }}
          </div>
        </div>
      </transition>
    </template>

    <template v-if="variant === 5">
      <AInternetButtonBordered @click="toggleContent" :title="title" />
      <transition name="fade">
        <div v-if="showContent" class="text-xl card example-5 shadow-xl">
          <div class="text-2xl"></div>
          <div class="inner">
            {{ content }}
          </div>
        </div>
      </transition>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AInternetButtonBordered from "@/components/atoms/buttons/AInternetButtonBordered.vue"
interface ABaseCardAnBorder {
  variant: number
  title: string
  subTitle?: string
  content: string
}

defineProps<ABaseCardAnBorder>()

const showContent = ref(false)

const toggleContent = () => {
  showContent.value = !showContent.value
}
</script>

<style lang="scss" scoped>
.card {
  word-wrap: break-word; /* Add this line */
  margin: 50px auto;
  border-radius: var(--border-radius);
}

.card .inner {
  padding: 25px;
  background: #272727f1;
  color: #ffffff;
  border-radius: var(--border-radius);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.card h3 {
  margin-bottom: 15px;
}

.example-1 {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.example-1 .inner {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 5px;
}

.example-1::before {
  content: '';
  display: block;
  background: linear-gradient(90deg, hsla(197, 100%, 64%, 1) 0%, hsla(339, 100%, 55%, 1) 100%);
  height: 600px;
  width: 600px;
  position: absolute;
  animation: rotate 8s linear infinite;
  z-index: 0;
}

.example-2 {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.example-2 .inner {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 2px;
  background-color: black
}


.example-2::before {
  content: '';
  display: block;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(102, 102, 102, 0.75) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  height: 300px;
  width: 100px;
  transform: translate(0);
  position: absolute;
  animation: rotate 5s linear forwards infinite;
  top: 50%;
  transform-origin: top center;
}

.example-3 {
  position: relative;
  border-radius: var(--border-radius);
  padding: 4px;
}

.example-3 .inner {
  border-radius: 4px;
}

.example-3::before,
.example-3::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(45deg, #ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff6700);
  background-size: 400%;
  z-index: -1;
  animation: glow 20s linear infinite;
  width: 100%;
  border-radius: var(--border-radius);
}

.example-3::after {
  filter: blur(25px);
  transform: translate3d(0, 0, 0);
  /* For Safari */
}

@keyframes glow {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 100% 0;
  }

  100% {
    background-position: 0 0;
  }
}

.example-4 {
  outline-width: 1px;
  outline-offset: 0;
  outline-color: rgba(0, 130, 206, 0.75);
  outline-style: solid;
  animation: animateOutline 4s ease infinite;
}

.example-5 {
  position: relative;
}

.example-5 svg {
  position: absolute;
}

.example-5 .line {
  stroke-dasharray: 260;
  stroke-width: 1px;
  fill: transparent;
  stroke: rgba(78, 255, 13, 0.3);
  animation: svgAnimation 2.5s linear infinite;
}

@keyframes svgAnimation {
  from {
    stroke-dashoffset: 0;
  }

  to {
    stroke-dashoffset: 1000;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes animateOutline {
  0% {
    outline-width: 1px;
    outline-offset: 0;
    outline-color: rgba(0, 130, 206, 0);
  }

  10% {
    outline-color: rgba(0, 130, 206, 0.75);
  }

  /* The animation finishes at 50% */
  50% {
    outline-width: 7px;
    outline-offset: 4px;
    outline-color: rgba(0, 130, 206, 0);
  }

  100% {
    outline-width: 7px;
    outline-offset: 4px;
    outline-color: rgba(102, 102, 102, 0);
  }
}
</style>
\
