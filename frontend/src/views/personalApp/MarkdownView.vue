<template>
  <div class="markdown-explorer">
    <!-- Sidebar with file explorer -->
    <div class="sidebar">
      <div class="folder-select">
        <input
          type="file"
          @change="handleFolderSelect"
          webkitdirectory
          directory
          ref="folderInput"
        />
        <button @click="$refs.folderInput.click()" class="select-btn">
          Select Folder
        </button>
      </div>
      
      <!-- File tree -->
      <div class="file-tree">
        <div
          v-for="file in files"
          :key="file.path"
          @click="loadFile(file)"
          :class="['file-item', { active: currentFile === file.path }]"
        >
          {{ file.name }}
        </div>
      </div>
    </div>

    <!-- Markdown content viewer -->
    <div class="content">
      <div v-if="currentFile" class="current-file">
        Currently viewing: {{ currentFile }}
      </div>
      <div class="markdown-viewer" v-html="parsedMarkdown"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { marked } from 'marked';

// State
const files = ref([]);
const currentFile = ref('');
const markdownContent = ref('');
const parsedMarkdown = ref('');
const folderInput = ref(null);

// Handle folder selection
const handleFolderSelect = (event) => {
  const fileList = event.target.files;
  files.value = Array.from(fileList)
    .filter(file => file.name.endsWith('.md'))
    .map(file => ({
      name: file.name,
      path: file.webkitRelativePath,
      file: file
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Load and parse markdown file
const loadFile = async (file) => {
  try {
    currentFile.value = file.path;
    const text = await file.file.text();
    markdownContent.value = text;
    parsedMarkdown.value = marked(text);
  } catch (error) {
    console.error('Error loading markdown file:', error);
  }
};

// Set up marked options (optional)
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true
});
</script>

<style scoped>
.markdown-explorer {
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
}

.sidebar {
  width: 250px;
  border-right: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

.folder-select {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.folder-select input[type="file"] {
  display: none;
}

.select-btn {
  width: 100%;
  padding: 0.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.select-btn:hover {
  background: #2563eb;
}

.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.file-item {
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
}

.file-item:hover {
  background: #e2e8f0;
}

.file-item.active {
  background: #bfdbfe;
  color: #1e40af;
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.current-file {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f1f5f9;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #64748b;
}

.markdown-viewer {
  line-height: 1.6;
  color: #333;
}

.markdown-viewer h1,
.markdown-viewer h2,
.markdown-viewer h3 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-viewer ul,
.markdown-viewer ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.markdown-viewer blockquote {
  border-left: 4px solid #cbd5e1;
  padding-left: 1rem;
  margin: 1rem 0;
  color: #64748b;
}

.markdown-viewer code {
  background: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.markdown-viewer pre {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}
</style>