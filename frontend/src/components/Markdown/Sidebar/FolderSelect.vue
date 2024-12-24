
<template>
  <div class="folder-select">
    <input
      type="file"
      @change="onFolderSelect"
      webkitdirectory
      directory
      ref="folderInput"
    />
    <button @click="$refs.folderInput.click()" class="select-btn">
      Select Folder
    </button>
  </div>
</template>

<script setup>
import { fileSystemService } from '@/services/fileSystem';
import { ref } from 'vue';

const emit = defineEmits(['folder-selected']);
const folderInput = ref(null);

const onFolderSelect = async () => {
  const directoryHandle = await fileSystemService.requestDirectoryAccess();
  if (!directoryHandle) return;
  
  const { files, fileHandles } = await fileSystemService.getFilesRecursively(directoryHandle);
  emit('folder-selected', { files, fileHandles, directoryHandle });
};
</script>

<style scoped>

.folder-select {
  padding: 1rem;
  border-bottom: 1px solid #112145;
}

.folder-select input[type="file"] {
  display: none;
}


.select-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ea580b;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.select-btn:hover {
  background: #4c71db;
}

</style>