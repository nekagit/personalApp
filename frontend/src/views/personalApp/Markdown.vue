<template>
  <div class="markdown-explorer">
    <div class="sidebar">
      <FolderSelect @folder-selected="handleFolderSelected" />
      <FileTree
        :files="files"
        :current-file="currentFile"
        @file-selected="loadFile"
      />
    </div>

    <div class="content-container">
      <MarkdownEditor
        v-model:content="markdownContent"
        :current-file="currentFile"
        :show-revision-editor="showRevisionEditor"
        @save="saveChanges"
        @create-revision="createNewRevision"
        @open-pdf="openPdfSelector"
      />

      <PdfViewer
        :show="showPdfViewer"
        :pdf-url="pdfUrl"
        :current-pdf-name="currentPdfName"
        @close="handleClosePdfViewer"
      />

      <RevisionEditor
        :show="showRevisionEditor"
        :current-file="currentFile"
        @save="saveRevision"
        @close="handleCloseRevisionEditor"
      />

      <input
        type="file"
        ref="pdfInput"
        accept=".pdf"
        @change="handlePdfSelect"
        style="display: none"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import {storeToRefs}  from 'pinia';
import { useMarkdownStore } from '@/stores/markdownStore';
import FolderSelect from '@/components/Markdown/Sidebar/FolderSelect.vue';
import FileTree from '@/components/Markdown/Sidebar/FileTree.vue';
import MarkdownEditor from '@/components/Markdown/Editor/MarkdownEditor.vue';
import PdfViewer from '@/components/Markdown/PdfViewer/PdfViewer.vue';
import RevisionEditor from '@/components/Markdown/Revision/RevisionEditor.vue';

// Initialize store and extract reactive state
const store = useMarkdownStore();
const {
  files,
  currentFile,
  markdownContent,
  showRevisionEditor,
  showPdfViewer,
  pdfUrl,
  currentPdfName,
} = storeToRefs(store);

// Extract actions
const {
  setFolderData,
  loadFile,
  saveChanges,
  saveRevision,
  setPdfData,
  closePdfViewer,
  toggleRevisionEditor,
  reset
} = store;

// Refs
const pdfInput = ref(null);

// Methods
const handleFolderSelected = (data) => {
  setFolderData(data);
};

const createNewRevision = () => {
  if (!currentFile.value) {
    alert('Please select a file first');
    return;
  }
  toggleRevisionEditor(true);
};

const handleCloseRevisionEditor = () => {
  toggleRevisionEditor(false);
};

// PDF handling methods
const openPdfSelector = () => {
  pdfInput.value?.click();
};

const handlePdfSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    setPdfData(URL.createObjectURL(file), file.name);
  }
};

const handleClosePdfViewer = () => {
  closePdfViewer();
  if (pdfInput.value) {
    pdfInput.value.value = '';
  }
};

// Cleanup on component unmount
onUnmounted(() => {
  reset();
});
</script>

<style scoped>
.markdown-explorer {
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif;
}

.sidebar {
  width: 250px;
  border-right: 1px solid #d1d5db;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

.content-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>