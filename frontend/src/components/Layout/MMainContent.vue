<template>
  <div class="flex-1 bg-[#fff]">
    <transition name="fade" mode="out-in">
      <div class="bg-[#fff]">

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
