<template>
  <ul
    class="p-0 m-auto block w-full max-w-[80vw] overflow-y-hidden overflow-x-auto whitespace-nowrap text-center scroll-smooth"
    v-if="!modalBool"
  >
    <li
      v-for="img in images"
      :key="img"
      class="sticky left-0 w-[min(50vw,350px)] inline-block text-center bg-[#16171f] text-[#9b9dad] pb-6 shadow-[0_-10px_30px_0_rgba(0,0,0,0.25)] ml-[-4px]"
    >
      <img :src="img" @click="openModal(img)" alt="sadf" />
    </li>
  </ul>
  <div v-if="modalBool" :id="modalId" class="modal" ref="modal" @click="closeModal">
    <div class="modal-content-wrapper" @click.stop>
      <button class="close" @click="closeModal">&times;</button>
      <ABaseImageCard :id="imgId" :imgSrc="modalImg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ABaseImageCard from '@/components/atoms/img/ABaseImgCard.vue'

// Define props
defineProps<{
  images: string[]
}>()

// Unique ID for the modal and image
const uniqueId = ref(Math.random().toString(36).substr(2, 9))
const modal = ref<HTMLElement | null>(null)
const modalBool = ref(false)
const modalImg = ref('')
const modalId = `myModal-${uniqueId.value}`
const imgId = `myImg-${uniqueId.value}`

// Function to open the modal
const openModal = (img: string) => {
  modalImg.value = img
  modalBool.value = true
}

// Function to close the modal
const closeModal = () => {
  modalImg.value = ''
  modalBool.value = false
}

onMounted(() => {
  modal.value = document.getElementById(modalId)
})
</script>
<style scoped>
ul {
  position: relative;
  z-index: 0; /* Ensure this is lower than the modal's z-index */
}

li {
  position: relative;
  z-index: 0; /* Ensure this is lower than the modal's z-index */
}

.modal {
  display: flex; /* Ensure the modal is displayed when modalBool is true */
  position: fixed;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0; /* Cover the entire viewport */
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10000; /* Ensure the modal is above all other content */
}

.modal-content-wrapper {
  position: relative;
  max-width: 90%;
  max-height: 90%;
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
