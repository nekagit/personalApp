<script setup lang="ts"></script>

<template>
  <nav id="topnav-component" class="top-0 h-24 z-20 hidden lg:flex  bg-transparent">
    <div class="container flex justify-between items-center">
      <div>
        <img class="w-auto sm:h-24" src="@/assets/logo/logo.jpg" alt="Logo" />
      </div>
      <div id="links" class="hidden sm:flex">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About Us</RouterLink>
        <RouterLink to="/services" class="nav-link">Services</RouterLink>
        <RouterLink to="/portfolio" class="nav-link">Portfolio</RouterLink>
        <RouterLink to="/pricing" class="nav-link">Pricing</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
}

.nav-link {
  padding: 0.5rem 1rem;
  border-left: 1px solid var(--color-border);
}

.nav-link:first-of-type {
  border: 0;
}
</style>
