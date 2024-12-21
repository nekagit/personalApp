<template>
  <div class="typewriter-container text-center">
    <h3 class="typewriter-text text-center">{{ displayText }}<span class="cursor">|</span></h3>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  texts: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenTexts?: number;
  playOnce?: boolean;  // New prop to control whether the animation should play once
}

const props = withDefaults(defineProps<Props>(), {
  typingSpeed: 100,
  erasingSpeed: 50,
  delayBetweenTexts: 2000,
  playOnce: true  // Default to true for single play
})

const displayText = ref('')
let currentIndex = 0
let isTyping = true
let timeoutId: number | undefined = undefined
let isPlaying = true

const typeText = () => {
  if (!isPlaying) return

  const currentText = props.texts[currentIndex]
  if (currentText === undefined) return

  if (isTyping && displayText.value.length < currentText.length) {
    displayText.value += currentText[displayText.value.length]
    timeoutId = window.setTimeout(typeText, props.typingSpeed)
  } else if (isTyping && displayText.value.length === currentText.length) {
    if (props.playOnce) {
      isPlaying = false
      return
    } else {
      isTyping = false
      timeoutId = window.setTimeout(eraseText, props.delayBetweenTexts)
    }
  } else if (!isTyping && displayText.value.length > 0 && !props.playOnce) {
    displayText.value = displayText.value.slice(0, -1)
    timeoutId = window.setTimeout(eraseText, props.erasingSpeed)
  } else if (!isTyping && displayText.value.length === 0 && !props.playOnce) {
    isTyping = true
    currentIndex = (currentIndex + 1) % props.texts.length
    timeoutId = window.setTimeout(typeText, props.typingSpeed)
  } else if (props.playOnce && isTyping) {
    currentIndex = (currentIndex + 1) % props.texts.length
    if (currentIndex === 0) {
      isPlaying = false
      return
    }
    timeoutId = window.setTimeout(typeText, props.typingSpeed)
  }
}

const eraseText = () => {
  if (!isPlaying) return

  if (!props.playOnce && displayText.value.length > 0) {
    displayText.value = displayText.value.slice(0, -1)
    timeoutId = window.setTimeout(eraseText, props.erasingSpeed)
  } else if (!props.playOnce && displayText.value.length === 0) {
    isTyping = true
    currentIndex = (currentIndex + 1) % props.texts.length
    timeoutId = window.setTimeout(typeText, props.typingSpeed)
  }
}

onMounted(() => {
  typeText()
})

onUnmounted(() => {
  if (timeoutId !== undefined) window.clearTimeout(timeoutId)
})
</script>


<style scoped>
.typewriter-container {
  width: 100%; /* Adjust as needed */
  height: auto; /* Adjust based on your needs */
  overflow: hidden;
}

.typewriter-text {
  display: inline-block;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin:auto;
  text-align: center;
  max-width: 100%;
  line-height: 1.5em;
  min-height: 3em; /* Match the container height */
}

.cursor {
  animation: blink 1.7s;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>