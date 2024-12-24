<template>
  <div v-if="show" class="pdf-viewer">
    <div class="toolbar">
      <div class="current-file">
        PDF: {{ currentPdfName }}
        <button @click="handleClose" class="close-btn">Close PDF</button>
      </div>
    </div>
    <iframe
      v-if="pdfUrl"
      :src="pdfUrl"
      class="pdf-frame"
      type="application/pdf"
      title="pdf"
    ></iframe>
  </div>
</template>

<script setup>
import { onUnmounted } from 'vue';

const props = defineProps({
  show: Boolean,
  pdfUrl: String,
  currentPdfName: String
});

const emit = defineEmits(['close']);

const handleClose = () => {
  emit('close');
};

onUnmounted(() => {
  if (props.pdfUrl) {
    URL.revokeObjectURL(props.pdfUrl);
  }
});
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
.pdf-viewer {
  flex: 0 0 50%;
  padding: 2rem;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.pdf-frame {
  flex: 1;
  border: none;
  border-radius: 0.375rem;
  background: white;
  width: 100%;
  height: 100%;
}


.current-file {
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: #2d2d3f;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #a5b4fc;
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

</style>