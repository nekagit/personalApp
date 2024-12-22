<template>
  <div class="app-container">
    <div class="file-inputs">
      <label class="file-label">
        <input type="file" accept=".txt" @change="handleTxtUpload" />
        <span><i class="icon icon-txt"></i> Upload .TXT File</span>
      </label>
      <label class="file-label">
        <input type="file" accept=".csv" @change="handleCsvUpload" />
        <span><i class="icon icon-csv"></i> Upload .CSV File</span>
      </label>
    </div>

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

// Handle .txt file upload
const handleTxtUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    parseTxtFile(file);
  } else {
    alert('Please upload a valid .txt file.');
  }
};

// Handle .csv file upload
const handleCsvUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    parseCsvFile(file);
  } else {
    alert('Please upload a valid .csv file.');
  }
};

// Function to parse flashcards from .txt file
function parseTxtFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result.replace(/,/g, ''); // Remove all commas
    const lines = text.split('\n');

    flashcards.value = lines.map(line => {
      const [front, ...backParts] = line.split('\t');
      const back = backParts.join('\t').trim();
      return { front, back };
    }).filter(card => card.front && card.back);
  };
  reader.readAsText(file);
}

// Function to parse flashcards from .csv file
function parseCsvFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result.replace(/,/g, ''); // Remove all commas
    const lines = text.split('\n');

    flashcards.value = lines.map(line => {
      const [front, back] = line.split(';');
      return { front: front?.trim(), back: back?.trim() };
    }).filter(card => card.front && card.back);
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
  border-radius: 10px;
}

.file-inputs {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #5e9fdd;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.file-label input[type="file"] {
  display: none;
}

.file-label:hover {
  background-color: #467db3;
  border-color: #ffffff;
}

.file-label .icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.icon-txt::before {
  content: '📄'; /* Replace with an SVG icon or other icon font if preferred */
}

.icon-csv::before {
  content: '📊'; /* Replace with an SVG icon or other icon font if preferred */
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

.front,
.back {
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
