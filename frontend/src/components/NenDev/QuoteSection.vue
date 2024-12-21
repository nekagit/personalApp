<template>
  <div class="quote-container">
    <div class="quote-content">
      <div class="quote-marks">"</div>
      <h1 class="quote-text">Neka budućnost kaže istinu i proceni svakoga prema njegovom radu i dostignućima.</h1>
      <p class="quote-author">Nikola Tesla</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No special logic required for this static component
</script>

<style scoped>
.quote-container {
  position: relative;
  max-width: 1000px;
  margin: 280px auto;
  padding: 40px 20px;
  /* background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); */
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  backdrop-filter: blur(4px);
  text-align:center;
}
@media (max-width: 1320px) {
    .quote-container {
  max-width: 500px;
}
}

.quote-content {
  position: relative;
  z-index: 1;
}

.quote-marks {
  position: absolute;
  top: -60px;
  left: -20px;
  font-size: 150px;
  font-family: 'Georgia', serif;
  color: rgba(196, 0, 122, 0.1);
  z-index: -1;
}

.quote-text {
  font-family: 'Georgia', serif;
  font-size: 2rem;
  line-height: 1.4;
  color: transparent;
  background: linear-gradient(90deg, #16d8fa, #3b82f6);
  /* background: linear-gradient(135deg, #ff00ff, #ff69b4); */
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: bold;
  margin-bottom: 1rem;
  position: relative;
}

.quote-text::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #16d8fa, #3b82f6);
  /* background: linear-gradient(90deg, #ff00ff, #ff69b4); */
}

.quote-author {
  font-family: 'Arial', sans-serif;
  font-style: italic;
  font-size: 1.2rem;
  color: #888;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .quote-container {
    margin: 60px auto;
    padding: 30px 15px;
  }

  .quote-text {
    font-size: 1.5rem;
  }

  .quote-marks {
    font-size: 100px;
    top: -40px;
  }
}

:global(.dark) .quote-container {
  background: linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:global(.dark) .quote-author {
  color: #bbb;
}
</style>