<template>
    <div class="horizontalBody text-white">
        <div class="separator ">
            <div class="line bg-black dark:bg-white"></div>
            <h2 class="text-black dark:text-white">{{ props.title }}</h2>
            <div class="line bg-black dark:bg-white"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['title'])
</script>

<style scoped>
.horizontalBody {
  max-width: 1100px;
  margin: 2rem auto;
}

.separator {
  display: flex;
  align-items: center;
  animation: expandLine 1s forwards;
}

.separator .line {
  height: 3px;
  flex: 1;
  animation: expandLine 1s forwards;
}

.separator h2 {
  color:black;
  padding: 0 2rem;
}

@keyframes expandLine {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
