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
        @close="closePdfViewer"
      />

      <RevisionEditor
        :show="showRevisionEditor"
        :current-file="currentFile"
        @save="saveRevision"
        @close="closeRevisionEditor"
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
import { fileSystemService } from '@/services/fileSystem';
import { markdownService } from '@/services/markdownService';
import FolderSelect from '@/components/Markdown/Sidebar/FolderSelect.vue';
import FileTree from '@/components/Markdown/Sidebar/FileTree.vue';
import MarkdownEditor from '@/components/Markdown/Editor/MarkdownEditor.vue';
import PdfViewer from '@/components/Markdown/PdfViewer/PdfViewer.vue';
import RevisionEditor from '@/components/Markdown/Revision/RevisionEditor.vue';

// State
const files = ref([]);
const fileHandles = ref(new Map());
const directoryHandle = ref(null);
const currentFile = ref('');
const currentFileHandle = ref(null);
const markdownContent = ref('');
const showRevisionEditor = ref(false);
const showPdfViewer = ref(false);
const pdfUrl = ref('');
const currentPdfName = ref('');
const pdfInput = ref(null);

// Methods
const handleFolderSelected = ({ files: newFiles, fileHandles: newHandles, directoryHandle: newDirHandle }) => {
  files.value = fileSystemService.sortFilesByName(newFiles);    
  fileHandles.value = newHandles;
  directoryHandle.value = newDirHandle;
};

const loadFile = async (file) => {
  try {
    currentFile.value = file.path;
    currentFileHandle.value = fileHandles.value.get(file.path);
    
    if (!currentFileHandle.value) throw new Error("File handle not found");
    
    const fileData = await currentFileHandle.value.getFile();
    markdownContent.value = await fileData.text();
  } catch (error) {
    console.error("Error loading file:", error);
    alert("Error loading file. Please try again.");
  }
};

const saveChanges = async (content) => {
  try {
    if (!currentFileHandle.value) throw new Error("No file handle available");
    await markdownService.saveFile(currentFileHandle.value, content);
    alert("Changes saved successfully!");
  } catch (error) {
    console.error("Error saving changes:", error);
    alert(`Error saving changes: ${error.message}`);
  }
};

// PDF handling methods
const openPdfSelector = () => {
  pdfInput.value?.click();
};

const handlePdfSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    currentPdfName.value = file.name;
    pdfUrl.value = URL.createObjectURL(file);
    showPdfViewer.value = true;
  }
};

const closePdfViewer = () => {
  showPdfViewer.value = false;
  if (pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value);
    pdfUrl.value = '';
  }
  currentPdfName.value = '';
  if (pdfInput.value) {
    pdfInput.value.value = '';
  }
};

// Revision handling methods
const createNewRevision = () => {
  if (!currentFile.value) {
    alert('Please select a file first');
    return;
  }
  showRevisionEditor.value = true;
};

const closeRevisionEditor = () => {
  showRevisionEditor.value = false;
};

const saveRevision = async ({ title, content }) => {
  try {
    if (!directoryHandle.value) {
      throw new Error('No directory access');
    }

    // Create revisions directory if it doesn't exist
    let revisionsDir;
    try {
      revisionsDir = await directoryHandle.value.getDirectoryHandle('revisions', {
        create: true,
      });
    } catch (error) {
      throw new Error('Could not create revisions directory');
    }

    // Create revision content with metadata
    const revisionData = [
      `# ${title}`,
      '',
      `Original File: ${currentFile.value}`,
      `Created: ${new Date().toISOString()}`,
      '',
      '## Notes',
      '',
      content
    ].join('\n');

    // Create and write revision file
    const fileName = `${title}.md`;
    const fileHandle = await revisionsDir.getFileHandle(fileName, { create: true });
    await markdownService.saveFile(fileHandle, revisionData);

    alert('Revision saved successfully!');
    closeRevisionEditor();

    // Refresh file list to include new revision
    if (directoryHandle.value) {
      const { files: newFiles, fileHandles: newHandles } = 
        await fileSystemService.getFilesRecursively(directoryHandle.value);
      files.value = newFiles;
      fileHandles.value = newHandles;
    }
  } catch (error) {
    console.error('Error saving revision:', error);
    alert(`Error saving revision: ${error.message}`);
  }
};

// Cleanup on component unmount
onUnmounted(() => {
  if (pdfUrl.value) {
    URL.revokeObjectURL(pdfUrl.value);
  }
});
</script>

<style scoped>

.markdown-explorer {
  display: flex;
  height: 100vh;
  font-family: "Inter", sans-serif; /* Modern font */
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

