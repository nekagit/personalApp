<template>
  <nav class="space-y-1">
    <router-link
    class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/"
      :class="['nav-link', { 'active-link': $route.path === '/' }]">
    <span>
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path :d="'M4 6h16M4 12h16M4 18h16'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
      </svg>
      Home
    </span>
    </router-link>

    <router-link
    class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/todo"
      :class="['nav-link', { 'active-link': $route.path === '/todo' }]"
    >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path :d="'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
    </svg>
      Todo
    </router-link>
  </nav>
</template>

<style scoped>
.nav-link {
  text-decoration: none;
  padding: 10px;
  display: block;
}

.active-link {
  background-color: #3498db;
  color: white;
}
</style>

<script setup lang="ts">
</script>
