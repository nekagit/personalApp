<template>
  <div class="markdown-explorer">
    <!-- Existing sidebar -->
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

    <!-- Main content area with split view support -->
    <div class="content-container">
      <!-- Original content viewer -->
      <div class="content" :class="{ 'with-revision': showRevisionEditor }">
        <div class="toolbar">
          <div v-if="currentFile" class="current-file">
            Currently viewing: {{ currentFile }}
            <button
              @click="createNewRevision"
              class="revision-btn"
              v-if="currentFile"
            >
              Create Revision Entry
            </button>
          </div>
          <div class="actions">
            <button
              @click="generateFlashcards"
              class="flashcards-btn"
              v-if="currentFile"
              :disabled="isGeneratingFlashcards"
            >
              {{
                isGeneratingFlashcards ? "Generating..." : "Create Flashcards"
              }}
            </button>
            <button
              @click="toggleEditMode"
              class="edit-btn"
              :class="{ active: isEditing }"
            >
              {{ isEditing ? "Preview" : "Edit" }}
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
        ></textarea>

        <div v-else class="markdown-viewer" v-html="parsedMarkdown"></div>
      </div>

      <!-- Revision editor -->
      <div v-if="showRevisionEditor" class="revision-editor">
        <div class="toolbar">
          <div class="current-file">New Revision Entry</div>
          <div class="actions">
            <button
              @click="saveRevision"
              class="save-btn"
              :disabled="!revisionContent.trim()"
            >
              Save Revision
            </button>
            <button @click="closeRevisionEditor" class="close-btn">
              Close
            </button>
          </div>
        </div>

        <div class="revision-form">
          <input
            v-model="revisionTitle"
            placeholder="Enter revision title"
            class="revision-title"
            type="text"
          />
          <textarea
            v-model="revisionContent"
            class="markdown-editor"
            placeholder="Write your revision notes here..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DOMPurify from "dompurify";
import MarkdownIt from "markdown-it";
import { ref } from "vue";

// Create a markdown-it instance
const md = new MarkdownIt();

// State
const files = ref([]);
const currentFile = ref("");
const markdownContent = ref("");
const parsedMarkdown = ref("");
const folderInput = ref(null);
const isEditing = ref(false);
const originalContent = ref("");
const hasChanges = ref(false);
// New state for revision functionality
const showRevisionEditor = ref(false);
const revisionContent = ref("");
const revisionTitle = ref("");
const REVISIONS_PATH =
  "/home/nenad/Documents/Cybersecurity/Messers Course/Revision";
// Add state for directory handle
const directoryHandle = ref(null);

// Handle folder selection
const handleFolderSelect = (event) => {
  const fileList = event.target.files;
  files.value = Array.from(fileList)
    .filter((file) => file.name.endsWith(".md"))
    .map((file) => ({
      name: file.name,
      path: file.webkitRelativePath,
      file: file,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

// Load file and parse markdown
const loadFile = async (file) => {
  try {
    currentFile.value = file.path;
    const text = await file.file.text();
    markdownContent.value = text;
    originalContent.value = text;
    hasChanges.value = false;

    const sanitizedText = text.replace(/\[object Object\]/g, (match) => {
      return JSON.stringify(match);
    });
    const rawHtml = md.render(sanitizedText);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);

    // Exit edit mode when loading a new file
    isEditing.value = false;
  } catch (error) {
    console.error("Error loading markdown file:", error);
  }
};

// Toggle edit mode
const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
  if (!isEditing.value) {
    // Update preview when exiting edit mode
    const rawHtml = md.render(markdownContent.value);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);
  }
};

// Handle content changes
const handleEdit = () => {
  hasChanges.value = markdownContent.value !== originalContent.value;
};

// Save changes
const saveChanges = async () => {
  try {
    // In a real application, you would implement file system access here
    // For now, we'll just update the preview and original content
    originalContent.value = markdownContent.value;
    const rawHtml = md.render(markdownContent.value);
    parsedMarkdown.value = DOMPurify.sanitize(rawHtml);
    hasChanges.value = false;

    // Show success message (you might want to implement a proper notification system)
    alert("Changes saved successfully!");
  } catch (error) {
    console.error("Error saving changes:", error);
    alert("Error saving changes. Please try again.");
  }
};

// New functions for revision handling
const createNewRevision = () => {
  showRevisionEditor.value = true;
  // Pre-fill revision title based on current file
  const baseName = currentFile.value.split("/").pop().replace(".md", "");
  revisionTitle.value = `${baseName}_revision_${new Date().toISOString().split("T")[0]}`;
};

const closeRevisionEditor = () => {
  showRevisionEditor.value = false;
  revisionContent.value = "";
  revisionTitle.value = "";
};
// Function to request directory access
const requestDirectoryAccess = async () => {
  try {
    // Request access to the file system
    directoryHandle.value = await window.showDirectoryPicker({
      mode: "readwrite",
      startIn: "documents",
    });
    return true;
  } catch (error) {
    console.error("Error accessing directory:", error);
    return false;
  }
};

// Modified saveRevision function
const saveRevision = async () => {
  try {
    // Request directory access if we don't have it
    if (!directoryHandle.value) {
      const hasAccess = await requestDirectoryAccess();
      if (!hasAccess) {
        alert("Directory access is required to save revisions.");
        return;
      }
    }

    const fileName = `${revisionTitle.value}.md`;

    // Create revision content with metadata
    const revisionData =
      `# ${revisionTitle.value}\n\n` +
      `Original File: ${currentFile.value}\n` +
      `Created: ${new Date().toISOString()}\n\n` +
      `## Notes\n\n${revisionContent.value}`;

    try {
      // Get or create the revisions subdirectory
      let revisionsDir;
      try {
        revisionsDir = await directoryHandle.value.getDirectoryHandle(
          "revisions",
          {
            create: true,
          }
        );
      } catch (error) {
        console.error("Error creating revisions directory:", error);
        throw new Error("Could not create revisions directory");
      }

      // Create and write to the file
      const fileHandle = await revisionsDir.getFileHandle(fileName, {
        create: true,
      });
      const writable = await fileHandle.createWritable();
      await writable.write(revisionData);
      await writable.close();

      alert("Revision saved successfully!");
      closeRevisionEditor();
    } catch (error) {
      console.error("Error writing file:", error);
      throw new Error("Could not write revision file");
    }
  } catch (error) {
    console.error("Error saving revision:", error);
    alert(`Error saving revision: ${error.message}`);
  }
};

// Function to generate flashcards
const generateFlashcards = async () => {
  try {
    const storedApiKey = import.meta.env.GPT_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `create a .csv for anki import with front and back semicolon separated i want 50 flashcards for this content:\n\n${markdownContent.value}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate flashcards");
    }

    const data = await response.json();
    const flashcardsContent = data.choices[0].message.content;

    // Create and download CSV file
    const blob = new Blob([flashcardsContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentFile.value.split("/").pop().replace(".md", "")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error generating flashcards:", error);
    alert(
      "Error generating flashcards. Please check your API key and try again."
    );
  } finally {
    isGeneratingFlashcards.value = false;
  }
};
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

.markdown-editor {
  width: 100%;
  min-height: 500px;
  padding: 1.5rem;
  font-family: "Menlo", "Monaco", "Courier New", monospace;
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

/* New styles for revision functionality */
.content-container {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content.with-revision {
  flex: 0 0 50%;
}

.revision-editor {
  flex: 0 0 50%;
  padding: 2rem;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
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

.close-btn {
  padding: 0.5rem 1rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
}

.close-btn:hover {
  background: #dc2626;
}

.revision-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.revision-title {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
}

.revision-title:focus {
  border-color: #5e81f4;
  outline: none;
  box-shadow: 0 0 0 2px rgba(94, 129, 244, 0.2);
}


.flashcards-btn {
  padding: 0.5rem 1rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

.flashcards-btn:hover {
  background: #1d4ed8;
}

.flashcards-btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

</style>
