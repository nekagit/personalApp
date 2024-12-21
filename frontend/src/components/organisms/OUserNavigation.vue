<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button class="w-full mt-4">
          <div
            class="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
          >
            <div
              class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"
            >
              <span class="text-sm font-medium">CN</span>
            </div>
            <div class="flex-1 text-left">
              <p class="text-sm font-medium">shadcn</p>
              <p class="text-xs text-gray-400">m@example.com</p>
            </div>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <div class="space-y-1">
          <div
            class="px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm"
          >
            Account settings
          </div>
          <div
            class="px-2 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm"
          >
            Support
          </div>
          <div
            class="px-2 py-1.5 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-sm"
          >
            Sign out
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
<script setup>
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
</script>
