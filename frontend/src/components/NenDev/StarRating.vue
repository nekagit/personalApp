<!-- StarRating.vue -->
<template>
  <div class="star-rating">
    <h4>{{ props.name }}</h4>
    <span
      v-for="n in 10"
      :key="n"
      :class="{ filled: n <= currentRating }"
      @click="setRating(n)"
      @mouseover="hoverRating(n)"
      @mouseleave="leaveRating"
    >
      ★
    </span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const currentRating = ref(props.rating)
const tempRating = ref(0)

const setRating = (value) => {
  currentRating.value = value
}

const hoverRating = (value) => {
  tempRating.value = value
}

const leaveRating = () => {
  tempRating.value = 0
}
</script>

<style scoped>
.star-rating span {
  font-size: 20px;
  cursor: pointer;
  color: gray;
}

.star-rating span.filled {
  color: gold;
}
</style>
