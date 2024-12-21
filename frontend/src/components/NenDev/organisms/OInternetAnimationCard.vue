<!-- <<template>
  <div class="wrap animate pop" :style="{ borderImage: borderGradient }">
    <div class="overlay" :style="{ background: overlayBackgroundColor }">
      <div class="overlay-content animate slide-left delay-2">
        <h1 class="animate slide-left pop delay-4">{{ title }}</h1>
        <p class="animate slide-left pop delay-5 subTitle" :style="{  color: subtitleColor, marginBottom: '2.5rem', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }">
          {{ subtitle }}
        </p>
      </div>
      <div class="image-content animate slide delay-5" :style="{ backgroundImage: `url(${mainImageUrl})` }"></div>
      <div class="dots animate">
        <div class="dot animate slide-up delay-6" v-for="(dot, index) in dots" :key="index" :style="{ background: dotColor, borderColor: dotBorderColor }"></div>
      </div>
    </div>
    <div class="text">
        <img class="inset" :src="insetImageUrl" alt="" />
      <p class="text-wrap" v-for="(paragraph, index) in splitTextContent" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: String,
  subtitle: String,
  subtitleColor: String,
  overlayBackgroundColor: String,
  mainImageUrl: String,
  insetImageUrl: String,
  textContent: Array,
  borderGradient: String,
  dotColor: String,
  dotBorderColor: String,
  dots: Number
});

const splitTextContent = computed(() => {
  return props.textContent.flatMap(paragraph => {
    const words = paragraph.split(' ');
    const chunks = [];
    for (let i = 0; i < words.length; i += 8) {
      chunks.push(words.slice(i, i + 8).join(' '));
    }
    return chunks;
  });
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5.25vmin;
  text-align: center;
  background-color: rgb(195, 255, 0);
  padding: 0.1rem;
  border-radius: 10px;
}
p {
  font-size: max(10pt, 2.5vmin);
  line-height: 1.4;
  color: #0e390e;
  margin-bottom: 1.5rem;
}
.subTitle {
  font-size: max(10pt, 2.5vmin);
  line-height: 1.4;
  background-color: rgb(195, 255, 0);
  border-radius: 10px;
  color: #0e390e;
  text-align: center;
  padding:0.5rem;
  margin-bottom: 1.5rem;
}

.wrap {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	width: 85vmin;
	height: 65vmin;
	margin: 2rem auto;
	border: 8px solid;
	border-image: linear-gradient(
			-50deg,
			rgb(33, 42, 88),
			#00b300,
			forestgreen,
			rgb(33, 42, 88),
			lightgreen,
			#00e600,
			rgb(33, 42, 88)
		)
		1;
	transition: 0.3s ease-in-out;
	position: relative;
	overflow: hidden;
}
.overlay {
	position: relative;
	display: flex;
	width: 100%;
	height: 100%;
	padding: 1rem 0.75rem;
	background: rgb(33, 42, 88);
	transition: 0.4s ease-in-out;
	z-index: 1;
}
.overlay-content {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 15vmin;
	height: 100%;
	// border: 3px solid;
	// border-image: linear-gradient(
	// 		to bottom,
	// 		#aea724 5%,
	// 		forestgreen 35% 65%,
	// 		#aea724 95%
	// 	)
	// 	0 0 0 100%;
	transition: 0.3s ease-in-out 0.2s;
	z-index: 1;
}
.image-content {
	position: absolute;
	top: 0;
	right: 0;
	width: 60vmin;
	height: 100%;
	background-size: cover;
	transition: 0.3s ease-in-out;
	/* border: 1px solid green; */
}

.inset {
	max-width: 50%;
	margin: 0.25em 1em 1em 0;
	border-radius: 0.25em;
	float: left;
}

.dots {
	position: absolute;
	bottom: 1rem;
	right: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 55px;
	height: 4vmin;
	transition: 0.3s ease-in-out 0.3s;
}
.dot {
	width: 14px;
	height: 14px;
	background: yellow;
	border: 1px solid indigo;
	border-radius: 50%;
	transition: 0.3s ease-in-out 0.3s;
}

.text {
	position: absolute;
	top: 0;
	right: 0;
	width: 60vmin;
	height: 100%;
	padding: 3vmin 4vmin;
	background: #fff;
	box-shadow: inset 1px 1px 15px 0 rgba(0 0 0 / 0.4);
	overflow-y: scroll;
}

 ::-webkit-scrollbar-corner {background-color: #0e390e;}
.wrap:hover .overlay {
  transform: translateX(-60vmin);
}
.wrap:hover .image-content {
  width: 30vmin;
}
.wrap:hover .overlay-content {
  transition-delay: 0.2s;
  transform: translateX(60vmin);
}
.wrap:hover .dots {
  transform: translateX(1rem);
}
.wrap:hover .dots .dot {
  background: white;
}

/* Animations and timing delays */
.animate {
  animation-duration: 0.7s;
  animation-timing-function: cubic-bezier(0.26, 0.53, 0.74, 1.48);
  animation-fill-mode: backwards;
}
/* Pop In */
.pop {
  animation-name: pop;
}
@keyframes pop {
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

/* Slide In */
.slide {
  animation-name: slide;
}
@keyframes slide {
  0% {
    opacity: 0;
    transform: translate(4em, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

/* Slide Left */
.slide-left {
  animation-name: slide-left;
}
@keyframes slide-left {
  0% {
    opacity: 0;
    transform: translate(-40px, 0);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.slide-up {
  animation-name: slide-up;
}
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(3em);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.delay-1 {
  animation-delay: 0.3s;
}
.delay-2 {
  animation-delay: 0.6s;
}
.delay-3 {
  animation-delay: 0.9s;
}
.delay-4 {
  animation-delay: 1.2s;
}
.delay-5 {
  animation-delay: 1.5s;
}
.delay-6 {
  animation-delay: 1.8s;
}
.delay-7 {
  animation-delay: 2.1s;
}
.delay-8 {
  animation-delay: 2.4s;
}
</style> -->
