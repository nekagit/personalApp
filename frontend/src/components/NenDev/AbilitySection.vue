<template>
  <div class="abilities my-16">
    <ul class="gap-8 grid grid-cols-1 md:grid-cols-2 xl:flex justify-between">
      <li v-for="(ability, index) in abilities" :key="index" class="flex flex-col items-center mb-8">
        <div class="text-center mb-4">
          <span class="text-2xl font-semibold">{{ ability.name }}</span>
        </div>
        <div class="relative flex justify-center items-center">
          <svg class="circular-progress" width="200" height="200" viewBox="0 0 72 72">
            <circle
              class="circle-background"
              cx="36" cy="36" r="32"
              fill="none" stroke="#e6e6e6" stroke-width="8"
            />
            <circle
              ref="circles"
              class="circle-progress"
              cx="36" cy="36" r="32"
              fill="none" stroke="#4f46e5" stroke-width="8"
              stroke-dasharray="100, 100"
              :data-percentage="ability.percentage"
            />
          </svg>
          <div class="absolute text-3xl font-bold text-amber-600">
            {{ ability.percentage }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted, ref } from 'vue';

const abilities = ref([
  { name: 'DevOps', percentage: '53%' },
  { name: 'Database', percentage: '63%' },
  { name: 'Backend', percentage: '68%' },
  { name: 'Frontend', percentage: '73%' }
]);

const circles = ref([]);

const animateCircle = (circle) => {
  const percentage = parseFloat(circle.getAttribute('data-percentage'));
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  gsap.set(circle, { strokeDasharray: `${0}, ${circumference}` }); // Start with 0%
  gsap.to(circle, {
    strokeDasharray: `${progress}, ${circumference}`, // Animate to the percentage
    duration: 3,
    ease: 'power2.out',
    stagger: 0.5
  });
};

const onIntersection = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circle = entry.target;
      animateCircle(circle);
      // Stop observing the circle after it has been animated
      observer.unobserve(circle);
    }
  });
};

const observer = new IntersectionObserver(onIntersection, {
  threshold: 0.5 // Trigger when at least 50% of the element is visible
});

onMounted(() => {
  circles.value.forEach(circle => {
    observer.observe(circle);
  });
});
</script>
<style scoped>
.circular-progress {
  transform: rotate(-90deg); /* Rotate the circle to start from top */
}

.circle-background {
  stroke: #e6e6e6;
  stroke-width: 8;
}

.circle-progress {
  stroke: rgb(217 119 6 / var(--tw-text-opacity));
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dasharray 1.5s ease-out;
}

.abilities {
  padding: 1.5rem;
}

.grid {
  grid-gap: 2rem;
}
</style>
