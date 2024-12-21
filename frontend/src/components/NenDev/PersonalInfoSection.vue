<template>
  <div class="flex flex-col xl:flex-row justify-around items-center gap-32 p-6 my-8 w-full">
    <div
      v-for="(item, index) in infoItems"
      :key="index"
      class="flex flex-col items-center p-4 w-full xl:flex-grow xl:w-full"
    >
      <p class="gradientText text-xl font-semibold mb-2 text-center title">
        {{ item.label }}
      </p>
      <p
        class="text-4xl font-extrabold text-black dark:text-white text-center"
        v-if="item.label !== 'AGE'"
      >
        {{ item.value }}
      </p>
      <p class="text-4xl font-extrabold text-black dark:text-white text-center" v-else>
        <span ref="ageRef">0</span> years
      </p>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap'
import { onMounted, reactive, ref } from 'vue'

const ageRef = ref(null)

const infoItems = reactive([
  { label: 'AGE', value: '' },
  { label: 'PLACE OF BIRTH', value: 'Germany, Dortmund' },
  { label: 'ACADEMICS', value: 'Computer Science Bachelor' }
])

onMounted(() => {
  const birthDate = new Date('1999-10-16')
  const ageInMilliseconds = Date.now() - birthDate.getTime()
  const ageInYears = ageInMilliseconds / (365 * 24 * 60 * 60 * 1000)
  gsap.to(ageRef.value, {
    duration: 2,
    ease: 'power2.out',
    innerHTML: ageInYears,
    snap: { innerHTML: 0.1 }, // Ensure snapping to 1 decimal place
    onUpdate: function () {
      ageRef.value.innerHTML = parseFloat(ageRef.value.innerHTML).toFixed(1)
    }
  })
})
</script>

<style scoped>

.title {
  font-size: 21pt ;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
