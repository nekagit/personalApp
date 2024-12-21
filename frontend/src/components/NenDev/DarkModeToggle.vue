<template>
  <div class="flex flex-col justify-center ml-3">
    <input
      type="checkbox"
      id="dark-mode-toggle"
      class="light-switch sr-only"
      @change="toggleDarkMode"
      :checked="isDarkMode"
    />
    <label class="relative cursor-pointer p-2" for="dark-mode-toggle">
      <Icon v-if="isDarkMode" icon="mdi:weather-night" class="text-white" />
      <Icon v-else icon="mdi:weather-sunny" class="text-yellow-500" />
    </label>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useHead } from '@vueuse/head'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  applyDarkMode()
}

const applyDarkMode = () => {
  localStorage.setItem('dark-mode', isDarkMode.value.toString())
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  isDarkMode.value = localStorage.getItem('dark-mode') !== 'false'
  applyDarkMode()
})

watch(isDarkMode, applyDarkMode)

// Use useHead to update the class on the html element
useHead({
  htmlAttrs: {
    class: isDarkMode.value ? 'dark' : ''
  }
})
</script>