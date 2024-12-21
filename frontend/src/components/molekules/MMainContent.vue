<template>
  <div class="flex-1">
    <transition name="fade" mode="out-in">
      <div class=" bg-white dark:bg-[#111828] text-black dark:text-white">

      <router-view class="" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
