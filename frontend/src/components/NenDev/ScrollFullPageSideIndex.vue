<template>
  <nav class="nav__wrapper p-0 pr-12 pb-10 xl:pb-96 pl-2.5" id="navbar-example">
    <ul class="nav">
      <li
        v-for="(sideListItem, index) in sideList"
        :key="index"
        :class="{ active: index === activeIndex }"
        class="relative mb-4 transition-all duration-300 ease-out"
      >
        <a
          :href="'#section' + (index + 1)"
          @click="scrollToSection(index + 1)"
          class="block p-0 text-[#00d0ff] transition-all duration-300 ease-out hover:pl-4"
        >
          <span class="nav__counter">{{ formatIndex(index + 1) }}</span>
          <h3 class="nav__title">{{ sectionTitles[index] }}</h3>
          <p class="nav__body">{{ sectionSubtitle[index] }}</p>
        </a>
      </li>
    </ul>
  </nav>
  <InternetLines />
  <section
    v-for="(sectionContent, index) in sectionContents"
    :key="index"
    class="section xl:p-40 xl:m-40 h-screen flex justify-center items-center bg-gray-800 text-4xl font-light"
    :id="'section' + (index + 1)"
  >
    <InternetRotateShine
      ref="rotateShine"
      :class="{ animate: isIntersecting[index] }"
      class="hidden xl:flex rotate-shine"
      :initial="{ opacity: 0, y: 100 }"
      :enter="enterAnimation"
      :variants="{ custom: { scale: 2 } }"
      :hovered="{ scale: 1.2 }"
      :delay="100"
      :duration="1200"
    />
    <div class="xs:mt-0 xl:mx-8">
      <OBaseImgModal
        :key="index"
        :title="sectionTitles[index]"
        :content="sectionContent"
        :sub-title="' '"
        :images="sectionImages[index]"
        :img-src="coverImages[index]"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import InternetLines from '@/components/background/InternetLines.vue'
import InternetRotateShine from '@/components/background/InternetMiddleRotateShine.vue'
import OBaseImgModal from '@/components/organisms/OBaseImgModal.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const props = defineProps<{
  sideList: string[]
  sectionContents: string[]
  sectionSubtitle: string[]
  sectionTitles: string[]
  coverImages: string[]
  sectionImages: string[][]
}>()

const activeIndex = ref(0)
const rotateShine = ref<HTMLElement[]>([])
const isIntersecting = ref<boolean[]>(Array(props.sectionContents.length).fill(false))

const scrollToSection = (index: number) => {
  const target = document.getElementById('section' + index)
  if (target) {
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    })
    activeIndex.value = index - 1
  }
}

const formatIndex = (index: number) => {
  return index < 10 ? '0' + index : index.toString()
}

const handleScroll = () => {
  const sections = document.querySelectorAll('.section')
  let index = 0
  for (const section of sections) {
    const rect = section.getBoundingClientRect()
    if (rect.top >= 0 && rect.top + 200 <= window.innerHeight) {
      activeIndex.value = index
      break
    }
    index++
  }
}

const enterAnimation = ref({ opacity: 0, y: 100 })

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
  window.addEventListener('scroll', handleScroll)

  const observerOptions = {
    threshold: 0.1
  }

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const index = rotateShine.value.findIndex((el) => el === entry.target)
      if (index !== -1) {
        isIntersecting.value[index] = entry.isIntersecting
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  rotateShine.value = Array.from(document.querySelectorAll('.rotate-shine'))
  rotateShine.value.forEach((el) => observer.observe(el))
})

const resetBodyStyles = () => {
  document.body.style.height = ''
  window.scrollTo(0, 0)
}

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  resetBodyStyles()
})

onBeforeRouteLeave((to, from, next) => {
  resetBodyStyles()
  next()
})
</script>

<style lang="scss" scoped>
.rotate-shine {
  opacity: 0;
  transform: translateY(200px) translateX(calc(var(--i) * 10px - 500px)); /* Scatter more to the sides */
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.animate {
  opacity: 1;
  transform: translateY(0) translateX(calc(var(--i) * 100px - 500px)); /* Scatter more to the sides */
}
.wrapper {
  min-height: 100vh;
  font-weight: 300;
  position: relative;
  z-index: 1;
}

section {
  font-size: 40px;
  font-weight: 100;
  background-color: rgb(33, 42, 88);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  $colors: (
    rgb(33, 42, 88),
    rgb(33, 42, 88),
    rgb(33, 42, 88),
    rgb(33, 42, 88),
    rgb(33, 42, 88),
    rgb(33, 42, 88)
  );

  @for $i from 1 through length($colors) {
    &:nth-child(#{$i}) {
      background: nth($colors, $i);
    }
  }
}

.nav {
  &__wrapper {
    position: fixed;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  & {
    margin: 0 0 50px 30px;
  }

  &__counter {
    font-size: 24px;
    transition: all 0.15s ease-out;
  }

  &__title {
    font-size: 32px;
    font-weight: 300;
    margin: 0 0 0.25em;
    color: #00d0ff;
    width: 300px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      height 0.3s ease-out,
      opacity 0.2s ease-out;
  }

  &__body {
    font-weight: 100;
    font-size: 18px;
    width: 300px;
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition:
      height 0.3s ease-out,
      opacity 0.2s ease-out;
  }

  li {
    position: relative;
    transition: all 0.3s ease-out;
    margin-bottom: 1em;

    &:after {
      content: '';
      display: block;
      border-left: 2px solid rgb(0, 0, 0);
      border-top: 2px solid rgb(0, 0, 0);
      height: 350px;
      width: 20px;
      position: absolute;
      left: -30px;
      top: 15px;
    }

    a {
      display: block;
      padding: 0;
      color: #00d0ff;
      transition: all 0.3s ease;

      &:hover {
        background-color: transparent;
        padding-left: 1em;
      }
      &:focus {
        background-color: transparent;
      }
    }

    &.active {
      pointer-events: none;
      padding-left: 1em;

      &:after {
        width: 35px;
        height: 400px;
        top: 35px;
      }

      .nav__counter {
        font-size: 48px;
      }
      .nav__title {
        height: 40px;
        opacity: 1;
        overflow: visible;
      }
      .nav__body {
        height: 100px;
        opacity: 1;
        overflow: visible;
      }
    }
  }
}
</style>
