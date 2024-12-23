<template>
  <div class="diary-explorer">
    <div class="sidebar">
      <!-- Load Directory Button -->
      <div class="load-directory">
        <button @click="loadDiaryFolder" class="load-dir-btn">
          Load Diary Directory
        </button>
      </div>

      <!-- New Entry Button -->
      <div class="new-entry" v-if="diaryEntries.length > 0">
        <button @click="createNewEntry" class="new-entry-btn">
          New Diary Entry
        </button>
      </div>
      
      <!-- File tree showing diary entries -->
      <div class="diary-entries" v-if="diaryEntries.length > 0">
        <div class="entries-title">My Diary Entries</div>
        <div
          v-for="entry in sortedEntries"
          :key="entry.path"
          @click="loadEntry(entry)"
          :class="['entry-item', { active: currentFile === entry.path }]"
        >
          {{ formatEntryName(entry.name) }}
        </div>
      </div>
    </div>

    <!-- Markdown content viewer/editor -->
    <div class="content">
      <div v-if="!diaryEntries.length" class="empty-state">
        Click "Load Diary Directory" to get started
      </div>
      <template v-else>
        <div class="toolbar">
          <div v-if="currentFile" class="current-file">
            {{ formatEntryName(currentFile.split('/').pop()) }}
          </div>
          <div class="actions">
            <button 
              @click="toggleEditMode" 
              class="edit-btn"
              :class="{ active: isEditing }"
            >
              {{ isEditing ? 'Preview' : 'Edit' }}
            </button>
            <button 
              v-if="isEditing" 
              @click="saveChanges" 
              class="save-btn"
              :disabled="!hasChanges"
            >
              Save Changes
            </button>
          </div>
        </div>
        
        <textarea
          v-if="isEditing"
          v-model="markdownContent"
          class="markdown-editor"
          @input="handleEdit"
          placeholder="Dear Diary..."
        ></textarea>
        
        <div 
          v-else 
          class="markdown-viewer" 
          v-html="parsedMarkdown"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import MarkdownIt from 'markdown-it';
import DOMPurify from 'dompurify';

const md = new MarkdownIt();

// State
const diaryEntries = ref([]);
const currentFile = ref('');
const markdownContent = ref('');
const parsedMarkdown = ref('');
const isEditing = ref(false);
const originalContent = ref('');
const hasChanges = ref(false);

// Sort entries by date (newest first)
const sortedEntries = computed(() => {
  return [...diaryEntries.value].sort((a, b) => {
    const dateA = new Date(a.name.split('.')[0]);
    const dateB = new Date(b.name.split('.')[0]);
    return dateB - dateA;
  });
});

// Format entry name for display
const formatEntryName = (filename) => {
  const date = filename.split('.')[0];
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Load diary folder when button is clicked
const loadDiaryFolder = async () => {
  try {
    const handle = await window.showDirectoryPicker();
    
    diaryEntries.value = [];
    for await (const entry of handle.values()) {
      if (entry.name.endsWith('.md')) {
        diaryEntries.value.push({
          name: entry.name,
          path: entry.name,
          handle: entry, // Save the file handle
        });
      }
    }

    if (sortedEntries.value.length > 0) {
      loadEntry(sortedEntries.value[0]);
    }
  } catch (error) {
    console.error('Error loading diary folder:', error);
    alert('Error loading diary folder. Please try again.');
  }
};


// Rest of the methods remain the same...
const createNewEntry = async () => {
  const today = new Date().toISOString().split('T')[0];
  const newFileName = `${today}.md`;
  
  // Add dummy handle to prevent undefined error
  diaryEntries.value.push({
    name: newFileName,
    path: newFileName,
    handle: null, // Placeholder for new entries
  });

  currentFile.value = diaryEntries.value[diaryEntries.value.length - 1];
  markdownContent.value = `# Diary Entry - ${formatEntryName(newFileName)}\n\n`;
  originalContent.value = markdownContent.value;
  hasChanges.value = false;
  isEditing.value = true;
};


const loadEntry = async (entry) => {
  try {
    currentFile.value = entry.path;
    const file = await entry.handle.getFile();
    const text = await file.text();
    markdownContent.value = text;
    originalContent.value = text;
    hasChanges.value = false;
    
    const sanitizedText = text.replace(/\[object Object\]/g, JSON.stringify);
    const rawHtml = md.render(sanitizedText);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);
    
    isEditing.value = false;
  } catch (error) {
    console.error('Error loading diary entry:', error);
  }
};

const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    const rawHtml = md.render(markdownContent.value);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);
  }
};

const handleEdit = () => {
  hasChanges.value = markdownContent.value !== originalContent.value;
};

const saveChanges = async () => {
  try {
    if (!currentFile.value.handle) {
      throw new Error("No file handle available for the current entry.");
    }

    const fileHandle = currentFile.value.handle;
    const writable = await fileHandle.createWritable();
    await writable.write(markdownContent.value);
    await writable.close();

    originalContent.value = markdownContent.value;
    const rawHtml = md.render(markdownContent.value);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);
    hasChanges.value = false;

    alert('Diary entry saved successfully!');
  } catch (error) {
    console.error('Error saving diary entry:', error);
    alert(`Error saving diary entry: ${error.message}`);
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

.markdown-viewer ol li::before {
  content: counter(list-item) ". ";
  font-weight: 600;
  color: #ff9500;
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

.actions {
  display: flex;
  gap: 0.5rem;
}

.edit-btn, .save-btn {
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

.markdown-editor {
  width: 100%;
  min-height: 500px;
  padding: 1.5rem;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 1rem;
  line-height: 1.5;
  color: #d1d5db;
  background-color: #282c34;
  border: 1px solid #4b5563;
  border-radius: 8px;
  resize: vertical;
  outline: none;
}

.markdown-editor:focus {
  border-color: #5e81f4;
  box-shadow: 0 0 0 2px rgba(94, 129, 244, 0.2);
}
/* Base styles from original component */
.diary-explorer {
  display: flex;
  height: 100vh;
  font-family: 'Inter', sans-serif;
}

/* Additional diary-specific styles */
.new-entry {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.new-entry-btn {
  width: 100%;
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.new-entry-btn:hover {
  background: #059669;
}

.entries-title {
  padding: 1rem;
  font-weight: 600;
  color: #4b5563;
  background: #f3f4f6;
}

.entry-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.entry-item:hover {
  background: #f3f4f6;
}

.entry-item.active {
  background: #e5e7eb;
  border-left: 4px solid #10b981;
}
.load-directory {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.load-dir-btn {
  width: 100%;
  padding: 0.75rem;
  background: #4c71db;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}

.load-dir-btn:hover {
  background: #3b5bba;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #6b7280;
  font-size: 1.1rem;
}
</style>
