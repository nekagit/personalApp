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
import MarkdownIt from 'markdown-it';  // Replace marked with markdown-it
import DOMPurify from 'dompurify';

// Create a markdown-it instance
const md = new MarkdownIt();

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

// Load file and parse markdown
const loadFile = async (file) => {
  try {
    currentFile.value = file.path;
    const text = await file.file.text();
    markdownContent.value = text;

    // Ensure all objects or arrays are converted to strings before passing to markdown-it
    const sanitizedText = text.replace(/\[object Object\]/g, (match) => {
      return JSON.stringify(match); // Converts the object into string form
    });
    const rawHtml = md.render(sanitizedText);
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    console.log(sanitizedHtml); // Check if the lists and headings are present
    parsedMarkdown.value = sanitizedHtml;

  } catch (error) {
    console.error('Error loading markdown file:', error);
  }
};
</script>

<style scoped>
.markdown-explorer {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif; /* Modern font */
}

.sidebar {
  width: 250px;
  border-right: 1px solid #d1d5db;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

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
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background-color: #fff;
}

.current-file {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #2d2d3f;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #a5b4fc;
}

.markdown-viewer {
  line-height: 1.75;
  color: #d1d5db;
  font-size: 1rem;
  white-space: pre-wrap; /* Ensures proper formatting of indented content */
  background-color: #282c34; /* Darker background */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.markdown-viewer h1,
.markdown-viewer h2,
.markdown-viewer h3 {
  color: #a5b4fc;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-viewer h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4a90e2; /* Light blue color for h1 */
}

.markdown-viewer h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #ff9500; /* Orange color for h2 */
}

.markdown-viewer h3 {
  font-size: 1.75rem;
  font-weight: 500;
  color: #333; /* Dark gray for h3 */
}

.markdown-viewer ul,
.markdown-viewer ol {
  margin-left: 2rem;
  padding-left: 1rem;
  list-style-position: outside; /* Ensures list markers are visible */
}

.markdown-viewer ul {
  list-style-type: disc; /* Bulleted lists */
}

.markdown-viewer ol {
  list-style-type: decimal; /* Numbered lists */
}

.markdown-viewer ul ul,
.markdown-viewer ol ul,
.markdown-viewer ul ol,
.markdown-viewer ol ol {
  margin-left: 1.5rem;
  list-style-type: circle; /* Nested lists */
}

.markdown-viewer li {
  margin-bottom: 0.5rem;
}

.markdown-viewer ol li {
  counter-increment: list-item;
}

.markdown-viewer ol {
  list-style-type: decimal;
  counter-reset: list-item;
}

.markdown-viewer ol li::before {
  content: counter(list-item) ". ";
  font-weight: 600;
  color: #ff9500;
}

</style>
