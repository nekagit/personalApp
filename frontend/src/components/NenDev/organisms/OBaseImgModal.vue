<template>
  <ABaseImageCard
    :id="'myImg' + uniqueId"
    class="image-card"
    :text="content"
    :imgSrc="imgSrc"
    :class="{ 'fade-in': isIntersecting }"
    @click="openModal"
  />

  <div :id="'myModal' + uniqueId" class="modal" @click="closeModal">
    <div class="modal-content-wrapper" @click.stop>
      <button class="close" @click="closeModal">&times;</button>
      <ABaseCardAnBorder
        class="modal-content"
        :content="content"
        :title="title"
        :sub-title="subTitle"
        :variant="3"
        :class="{ 'animate-left': isIntersecting }"
      />
      <MBaseGallerySlider :slider-titles="['']" :images="images" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ABaseImageCard from '@/components/atoms/img/ABaseImgCard.vue';
import ABaseCardAnBorder from '@/components/molekules/cards/MBaseCardAnBorder.vue';
import MBaseGallerySlider from '@/components/molekules/img/MBaseGallerySlider.vue';

defineProps<{
  title: string
  subTitle: string
  content: string
  imgSrc: string
  images: string[]
}>()

const uniqueId = ref(Math.random().toString(36).substr(2, 9))
const modal = ref<HTMLElement | null>(null)
const isIntersecting = ref(false)

const openModal = () => {
  if (modal.value) {
    modal.value.style.display = 'block'
    document.body.style.overflow = 'hidden' // Disable main scrollbar
  }
}

const closeModal = () => {
  if (modal.value) {
    modal.value.style.display = 'none'
    document.body.style.overflow = 'auto' // Enable main scrollbar
  }
}

onMounted(() => {
  modal.value = document.getElementById('myModal' + uniqueId.value)
  const observerOptions = {
    threshold: 0.1
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isIntersecting.value = true
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)
  const target = document.getElementById('myImg' + uniqueId.value)

  if (target) {
    observer.observe(target)
  }
})
</script>

<style scoped>
.image-card {
  z-index: 0; /* Ensure the image is at a lower z-index */
  position: relative;
  width: 80%;
  margin: auto;
  opacity: 0;
  transform: translateY(20px) scale(1); /* Initial scale set to 1 */
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}


.image-card.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.modal {
  display: none;
  position: fixed;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1000; /* Ensure the modal is on top */
}

.modal-content-wrapper {
  position: relative;
}

.modal-content {
  margin: auto;
  display: block;
  padding: 1rem;
  width: 75%;
  opacity: 0;
  transform: translateX(-100px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.modal-content.animate-left {
  opacity: 1;
  transform: translateX(0);
}

.modal-image {
  width: 100%;
}

.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  z-index: 9999;
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
