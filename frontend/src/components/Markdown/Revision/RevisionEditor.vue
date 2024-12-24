<template>
  <div v-if="show" class="revision-editor">
    <div class="toolbar">
      <div class="current-file">New Revision Entry</div>
      <div class="actions">
        <button
          @click="handleSave"
          class="save-btn"
          :disabled="!revisionContent.trim()"
        >
          Save Revision
        </button>
        <button @click="handleClose" class="close-btn">
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
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  show: Boolean,
  currentFile: String
});

const emit = defineEmits(['save', 'close']);

const revisionTitle = ref('');
const revisionContent = ref('');

const handleSave = () => {
  emit('save', {
    title: revisionTitle.value,
    content: revisionContent.value
  });
};

const handleClose = () => {
  revisionTitle.value = '';
  revisionContent.value = '';
  emit('close');
};
</script>


<style scoped>

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


.current-file {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #2d2d3f;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #a5b4fc;
}



.revision-editor {
  flex: 0 0 50%;
  padding: 2rem;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
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
</style>