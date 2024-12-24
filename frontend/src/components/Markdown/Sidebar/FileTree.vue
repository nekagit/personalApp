<template>
  <div class="file-tree">
    <div
      v-for="file in files"
      :key="file.path"
      @click="$emit('file-selected', file)"
      :class="['file-item', { active: currentFile === file.path }]"
    >
      {{ file.name }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  files: {
    type: Array,
    required: true
  },
  currentFile: {
    type: String,
    default: ''
  }
});

defineEmits(['file-selected']);
</script>

<style scoped>

.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  color: #e1e1e6;
}

.file-item {
  color: #0c0f30;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}

.file-item:hover {
  background: #3e3e53;
}

.file-item.active {
  background: #5e81f4;
  color: white;
}</style>