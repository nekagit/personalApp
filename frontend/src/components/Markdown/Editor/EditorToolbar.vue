<template>
  <div class="toolbar">
    <div v-if="currentFile" class="current-file">
      Currently viewing: {{ currentFile }}
      <button @click="$emit('open-pdf')" class="pdf-btn">
        Open Related PDF
      </button>
      <button @click="$emit('create-revision')" class="revision-btn">
        Create Revision Entry
      </button>
    </div>
    <div class="actions">
      <CreateMarkdownFile v-if="directoryHandle != null" @file-created="handleNewFile" />

      <button
        v-if="currentFile != ''"
        @click="$emit('toggle-edit')"
        class="edit-btn"
        :class="{ active: isEditing }"
      >
        {{ isEditing  ? "Preview" : "Edit" }}
      </button>
      <button
        v-if="isEditing"
        @click="$emit('save')"
        class="save-btn"
        :disabled="!hasChanges"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script setup>
import CreateMarkdownFile from '@/components/Markdown/Editor/CreateMarkdownFile.vue';
import { markdownService } from '@/services/markdownService';
import { fileSystemService } from '@/services/fileSystem';
import { useMarkdownStore } from '@/stores/markdownStore';
import {storeToRefs}  from 'pinia';

// Initialize store and extract reactive state
const store = useMarkdownStore();
const {
  files,
  currentFile,
  directoryHandle,
  fileHandles
} = storeToRefs(store);

const props = defineProps({
  isEditing: Boolean,
  hasChanges: Boolean
});
const handleNewFile = async ({ filename, content }) => {
  try {
    console.log(directoryHandle)
    if (!directoryHandle) {
      throw new Error('No directory access');
    }
    
    const fileHandle = await directoryHandle.value.getFileHandle(filename, { create: true });
    await markdownService.saveFile(fileHandle, content);
    
    // Refresh file list
    const { files: newFiles, fileHandles: newHandles } = 
      await fileSystemService.getFilesRecursively(directoryHandle.value);
    files.value = newFiles;
    fileHandles.value = newHandles;
  } catch (error) {
    console.error('Error creating file:', error);
    alert(`Error creating file: ${error.message}`);
  }
};

defineEmits(['toggle-edit', 'save', 'create-revision', 'open-pdf']);
</script>

<style scoped>

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn,
.save-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-btn {
  background: #4c71db;
  color: white;
  border: none;
}

.edit-btn.active {
  background: #374151;
}

.save-btn {
  background: #10b981;
  color: white;
  border: none;
}

.save-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f3f4f6;
  border-radius: 0.375rem;
}

.current-file {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #2d2d3f;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #a5b4fc;
}

.pdf-btn {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.pdf-btn:hover {
  background: #dc2626;
}

.revision-btn {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.revision-btn:hover {
  background: #7c3aed;
}

</style>