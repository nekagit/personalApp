<template>
  <div class="image-container mx-auto my-8">
    <img :src="imageSrc" alt="Developer portrait" class="portrait-image" />
    <div>
      <div class="languages flex flex-row">
        <Icon
          icon="twemoji:flag-for-flag-germany"
          class="flag"
          @mouseover="showModal('German')"
          @mouseleave="hideModal"
        />
        <Icon
          icon="twemoji:flag-for-flag-serbia"
          class="flag"
          @mouseover="showModal('Serbish')"
          @mouseleave="hideModal"
        />
        <Icon
          icon="twemoji:flag-for-flag-united-kingdom"
          class="flag"
          @mouseover="showModal('English')"
          @mouseleave="hideModal"
        />
        <Icon
          icon="twemoji:flag-for-flag-spain"
          class="flag"
          @mouseover="showModal('Spanish')"
          @mouseleave="hideModal"
        />
        <Icon
          icon="twemoji:flag-for-flag-turkey"
          class="flag"
          @mouseover="showModal('Turkish')"
          @mouseleave="hideModal"
        />
        <div v-if="isModalVisible" class="modal">
          <div class="modal-content">
            <h3 class="modal-title">{{ currentLanguage }}</h3>
            <p class="language-level">{{ getLanguageLevel(currentLanguage) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import imageSrc from "@/assets/NenadOG.jpg"

const isModalVisible = ref(false)
const currentLanguage = ref('')

const languageLevels = {
  German: 'C2',
  Serbish: 'C2',
  English: 'C2',
  Spanish: 'B2',
  Turkish: 'A1'
}

const showModal = (language) => {
  currentLanguage.value = language
  isModalVisible.value = true
}

const hideModal = () => {
  isModalVisible.value = false
}

const getLanguageLevel = (language) => {
  return languageLevels[language]
}
</script>

<style scoped>

.image-container {
  flex: 1;
  text-align: center;
  position: relative;
  margin:2rem;
}

.portrait-image {
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 15px;
 
  background: rgb(236, 236, 236);
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: all 1s ease-in-out;
}

.portrait-image:hover {
 
  transform: translateY(-5px);
  box-shadow: 0 15px 400px rgba(27, 121, 230, 0.507);
}

.languages {
  margin-top: 1rem;
  position: relative;
}

.flag {
  width: 40px;
  height: auto;
  margin: 0 5px;
}

.modal {
  position: absolute;
  top: 0px;
  left: 250px;
  width: 100px;
  height: 100px;
  padding: 1rem;
  box-shadow: 0 15px 400px rgba(27, 121, 230, 0.507);
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

@media (max-width: 720px) {
  .image-container {
  margin:1rem 0rem;

}
  .modal {
    top: -100px;
    left: 200px;
  }
}
@media (min-width: 720px) {
    .image-container {
  margin:auto;
  margin-bottom:3rem;


}
  .modal {
    top: 0px;
    right: 0px;
  }
}

.modal-content {
  text-align: center;
  color: white;
}

.modal-title {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.language-level {
  color: white;
  font-size: 1rem;
}
</style>