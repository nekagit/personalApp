<template>
  <img :src="imgSrc" @click="openModal" alt="sdf" />

  <div :id="modalId" class="modal h-screen" ref="modal" @click="closeModal">
    <div class="modal-content-wrapper" @click.stop>
      <button class="close" @click="closeModal">&times;</button>
      <ABaseImageCard :id="imgId" :imgSrc="imgSrc" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ABaseImageCard from '@/components/atoms/img/ABaseImgCard.vue'

defineProps<{
  imgSrc: string
}>()

const uniqueId = ref(Math.random().toString(36).substr(2, 9))
const modal = ref<HTMLElement | null>(null)

const modalId = `myModal-${uniqueId.value}`
const imgId = `myImg-${uniqueId.value}`

const openModal = () => {
  if (modal.value) {
    modal.value.style.display = 'flex'
  }
}

const closeModal = () => {
  if (modal.value) {
    modal.value.style.display = 'none'
  }
}

onMounted(() => {
  modal.value = document.getElementById(modalId)
})
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
  /* Ensure the image is clickable but not above the modal */
  z-index: 0;
}

.modal {
  display: none;
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0; /* Cover the entire viewport */
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000; /* Ensure the modal is above all other content */
}

.modal-content-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  margin: auto;
  display: block;
  padding: 1rem;
  width: 75%;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {
    transform: scale(0.4);
  }
  to {
    transform: scale(1);
  }
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #ff0000;
  font-size: 40px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10001; /* Ensure the close button is above modal content */
  transition: color 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
}

/* Style for smaller screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
