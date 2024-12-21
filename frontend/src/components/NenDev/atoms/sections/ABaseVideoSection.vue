<template>
  <section class="video-section">
    <video autoplay loop muted>
      <source src="../../../assets/video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="content-overlay">
      <h1>Welcome</h1>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped>
.video-section {
  position: relative;
  width: 100%;
  height: 100vh; /* Full height of the device */
  overflow: hidden;
}

.video-section video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}

.content-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.content-overlay h1 {
  color: white;
  font-size: 3em;
  margin-bottom: 20px;
}

.content-overlay button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.5em;
  cursor: pointer;
}
</style>
