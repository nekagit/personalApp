<template>
  <div class="app-container">
    <input type="file" accept=".txt" @change="handleFileUpload" />

    <div v-if="flashcards.length > 0" class="flashcard-container" @click="flipCard">
      <div :class="['flashcard', { flipped: isFlipped }]">
        <div class="front">
          <p>{{ currentFlashcard.front }}</p>
        </div>
        <div class="back">
          <p>{{ currentFlashcard.back }}</p>
        </div>
      </div>
    </div>

    <div class="controls">
      <button @click="prevCard" :disabled="currentIndex === 0">Previous</button>
      <button @click="nextCard" :disabled="currentIndex === flashcards.length - 1">Next</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// State for flashcards, file input handling, and card state
const flashcards = ref([]);
const currentIndex = ref(0);
const isFlipped = ref(false);

// Computed property for current flashcard
const currentFlashcard = computed(() => flashcards.value[currentIndex.value]);

// Method to flip the card
function flipCard() {
  isFlipped.value = !isFlipped.value;
}

// Navigation methods
function nextCard() {
  if (currentIndex.value < flashcards.value.length - 1) {
    currentIndex.value++;
    isFlipped.value = false; // Reset flip state
  }
}

function prevCard() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    isFlipped.value = false; // Reset flip state
  }
}

// Handle file upload
const handleFileUpload = (event) => {
  const input = event.target;
  const file = input.files?.[0];

  if (file && file.name.endsWith('.txt')) {
    parseFlashcards(file);
  } else {
    alert('Please upload a valid .txt file.');
  }
};

// Function to parse flashcards from .txt file
function parseFlashcards(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split('\n');

    flashcards.value = lines.map(line => {
      const [front, ...backParts] = line.split('\t');
      const back = backParts.join('\t').trim(); // Join any extra tabs in the back content
      return { front, back };
    }).filter(card => card.front && card.back); // Filter out any malformed entries
  };
  reader.readAsText(file);
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f7fa;
}

input[type="file"] {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.flashcard-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.flashcard {
  display: flex;
  width: 320px;
  height: 220px;
  perspective: 1000px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.front, .back {
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  font-size: 1.2rem;
  background-color: #ffffff;
  color: #333;
  transition: transform 0.6s ease-in-out, background-color 0.3s ease;
}

.back {
  transform: rotateY(180deg);
  background-color: #f9f9f9;
}

.flipped .front {
  transform: rotateY(180deg);
}

.flipped .back {
  transform: rotateY(0);
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #5e9fdd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #467db3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
