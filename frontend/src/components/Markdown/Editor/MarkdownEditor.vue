<template>
  <div class="content" :class="{ 'with-revision': showRevisionEditor }">
    <EditorToolbar
      :is-editing="isEditing"
      :has-changes="hasChanges"
      @toggle-edit="toggleEditMode"
      @save="saveChanges"
      @create-revision="$emit('create-revision')"
      @open-pdf="$emit('open-pdf')"
    />

    <textarea
      v-if="isEditing"
      v-model="localContent"
      class="markdown-editor"
      @input="handleEdit"
    ></textarea>

    <div v-else class="markdown-viewer" v-html="parsedMarkdown"></div>
  </div>
</template>

<script setup>
import { markdownService } from '@/services/markdownService';
import { computed, ref, watch } from 'vue';
import EditorToolbar from './EditorToolbar.vue';

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  showRevisionEditor: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits(['update:content', 'save', 'create-revision', 'open-pdf']);

const isEditing = ref(false);
const localContent = ref(props.content);
const originalContent = ref(props.content);
const hasChanges = ref(false);

const parsedMarkdown = computed(() => 
  markdownService.parseMarkdown(localContent.value)
);

watch(() => props.content, (newContent) => {
  localContent.value = newContent;
  originalContent.value = newContent;
  hasChanges.value = false;
});


const toggleEditMode = () => {
  isEditing.value = !isEditing.value;
};

const handleEdit = () => {
  hasChanges.value = localContent.value !== originalContent.value;
  emit('update:content', localContent.value);
};

const saveChanges = () => {
  emit('save', localContent.value);
  originalContent.value = localContent.value;
  hasChanges.value = false;
};
</script>

<style scoped>


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

.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.content.with-revision {
  flex: 0 0 50%;
}


/* New PDF-related styles */
.content.with-pdf {
  flex: 0 0 50%;
}

</style>