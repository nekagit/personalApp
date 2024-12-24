<template>
  <div>
    <!-- Button to open modal -->
    <button
      @click="openModal"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Create New File
    </button>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Create New Markdown File</h2>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="filename" class="block text-sm font-medium text-gray-700 mb-1">
              File Name
            </label>
            <input
              id="filename"
              v-model="filename"
              type="text"
              placeholder="Enter file name"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': showError }"
            />
            <p v-if="showError" class="mt-1 text-sm text-red-500">
              Please enter a file name
            </p>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['file-created']);

// State
const showModal = ref(false);
const filename = ref('');
const showError = ref(false);

// Methods
const openModal = () => {
  showModal.value = true;
  filename.value = '';
  showError.value = false;
};

const closeModal = () => {
  showModal.value = false;
  filename.value = '';
  showError.value = false;
};

const handleSubmit = () => {
  if (!filename.value.trim()) {
    showError.value = true;
    return;
  }

  // Add .md extension if not present
  let finalFilename = filename.value.trim();
  if (!finalFilename.toLowerCase().endsWith('.md')) {
    finalFilename += '.md';
  }

  // Emit event with filename
  emit('file-created', {
    filename: finalFilename,
    content: '', // Initial empty content
    timestamp: new Date().toISOString()
  });

  closeModal();
};
</script>