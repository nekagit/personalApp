<template>
  <nav class="space-y-1">
    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/"
      :class="['nav-link', { 'active-link': $route.path === '/' }]"
    >
      <span class="flex items-center gap-3">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            :d="'M4 6h16M4 12h16M4 18h16'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        <span>Home</span>
      </span>
    </router-link>

    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/todo"
      :class="['nav-link', { 'active-link': $route.path === '/todo' }]"
    >
      <span class="flex items-center gap-3">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            :d="'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        <span>Todo</span>
      </span>
    </router-link>

    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/pomodoro"
      :class="['nav-link', { 'active-link': $route.path === '/pomodoro' }]"
    >
      <span class="flex items-center gap-3">
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="12"
            y1="12"
            x2="12"
            y2="6"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <line
            x1="12"
            y1="12"
            x2="16"
            y2="12"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Pomodoro</span>
      </span>
    </router-link>

    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/calendar"
      :class="['nav-link', { 'active-link': $route.path === '/calendar' }]"
    >
      <span class="flex items-center gap-3">
        <!-- Calendar SVG -->
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            :d="'M19 3h-2a1 1 0 00-1 1v2h-8V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1z'"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            :d="'M4 7h16'"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Calendar</span>
      </span>
    </router-link>

    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/markdown"
      :class="['nav-link', { 'active-link': $route.path === '/markdown' }]"
    >
      <span class="flex items-center gap-3">
        <!-- Markdown SVG -->
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            :d="'M4 6h16M4 12h16M4 18h16'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        <span>Markdown</span>
      </span>
    </router-link>


    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/diary"
      :class="['nav-link', { 'active-link': $route.path === '/diary' }]"
    >
      <span class="flex items-center gap-3">
        <!-- Markdown SVG -->
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            :d="'M4 6h16M4 12h16M4 18h16'"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        <span>Diary</span>
      </span>
    </router-link>

    <router-link
      class="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
      to="/flashCard"
      :class="['nav-link', { 'active-link': $route.path === '/flashCard' }]"
    >
      <span class="flex items-center gap-3">
        <!-- FlashCard SVG -->
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            :d="'M7 7h10M7 12h10M7 17h10'"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>FlashCard</span>
      </span>
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

.nav-link span {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between the SVG and text */
}

.nav-link svg {
  width: 20px; /* Adjust size of the icon */
  height: 20px; /* Adjust size of the icon */
}
</style>
