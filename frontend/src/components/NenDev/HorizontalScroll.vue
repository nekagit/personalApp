<template>
  <div id="page" ref="page">
    <div class="pane">
      <div class="flex flex-col p-4 xl:p-12">
        <h1 class="text-center text-white underline text-3xl xl:text-2xl lg:text-4xl">
          SOP Rotterdam School
        </h1>
        <OInternetAnimationCard
          title="Intro"
          subtitle="Overview"
          subtitleColor="black"
          overlayBackgroundColor="rgb(33, 42, 88)"
          :mainImageUrl="SchoolHeader"
          :insetImageUrl="SchoolLogo"
          :textContent="[
            'ДОЂИТЕ ДА СЕ ДРУЖИМО И КРОЗ ИГРУ УЧИМО',
            'Српски језик , културу и историју за ученике основних школа. Под покровитељством Министарства просвете, науке и технолошког развоја Републике Србије. Часови су бесплатни.'
          ]"
          borderGradient="linear-gradient(-50deg, rgb(222, 213, 167), #ded5a7, #f1eac6, #ded5a7, #cfc28b, #e8dfb3, rgb(222, 213, 167)) 1"
          dotColor="yellow"
          dotBorderColor="indigo"
          :dots="3"
        />
      </div>
    </div>
    <div class="pane">
      <div class="flex flex-col p-4 xl:p-12 gap-4 xs:gap-16 h-screen">
        <h1 class="text-center text-white underline text-3xl xl:text-2xl lg:text-4xl">
          General Information
        </h1>
        <AInternetUpFlipCard
          :imgSrc="Card1"
          :title="'ДОЂИТЕ ДА СЕ ДРУЖИМО И КРОЗ ИГРУ УЧИМО'"
          :description="'Oдвија се под покровитељством Министарства просвете, науке и технолошког развоја Републике Србије и Амбасаде Републике Србије у Краљевини Холандији, потпомогнута од стране удружења СОП Ротердам.'"
        />
        <AInternetUpFlipCard
          :imgSrc="SchoolBuilding"
          :title="'Nastava'"
          :description="'Посебан програм основног образовања и васпитања у иностранству реализује се на три узрасна нивоa: млађем ( први, други и трећи разред), средњем ( четврти, пети и шести разред) и старијем ( седми и осми разред) из три предемта: Српски језик, Моја отаџбина Србија и Основи културе српског народа.'"
        />
        <AInternetUpFlipCard
          :imgSrc="schoolBag"
          :title="'Практичне информације'"
          :description="'-Велику свеску А4 на линије\n-Оловку и гумицу/оштрач\n-Дрвене бојице\n-Мапу/ фациклу'"
        />
      </div>
    </div>
    <div class="pane flex flex-col">
      <h1 class="text-center text-white underline text-3xl xl:text-2xl lg:text-4xl">
        Working Staff
      </h1>
      <ABaseContactCard :full-name="'Biljana Krum'" :title="'Teacher'" :img-src="Rihana" />
      <ABaseAnimationCard
        class="max-w-full xl:max-w-[400px]"
        title="'School'"
        :content="'Удружење Српско Омладинско Пријатељство Ротердам admin@stichtingsoprotterdam.nl Амбасада Републике Србије у Краљевини Холандији konzularno.hag@mfa.rs Биљана Крчум krcumb@gmail.com'"
      />
    </div>
    <div class="pane">
      <AInternetContactCard
        :title="'Contact Teacher'"
        subtitle="Wanna get in contact with me? Fill in the form and i will reply as fast as i can."
        email="krcumb@gmail.com"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Card1 from '@/assets/SOP/schoolPage/card1.jpg'
import Rihana from '@/assets/SOP/schoolPage/rihana.jpg'
import schoolBag from '@/assets/SOP/schoolPage/schoolBag.jpg'
import SchoolBuilding from '@/assets/SOP/schoolPage/schoolBuilding-Photoroom.jpg'
import SchoolHeader from '@/assets/SOP/schoolPage/schoolHeader.jpg'
import SchoolLogo from '@/assets/SOP/schoolPage/schoolLogo.jpg'
import ABaseAnimationCard from '@/components/atoms/cards/ABaseAnimationCard.vue'
import ABaseContactCard from '@/components/atoms/cards/ABaseContactCard.vue'
import AInternetContactCard from '@/components/atoms/cards/AInternetContactCard.vue'
import AInternetUpFlipCard from '@/components/atoms/cards/internet/AInternetUpFlipCard.vue'
import OInternetAnimationCard from '@/components/organisms/OInternetAnimationCard.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

const page = ref<HTMLElement | null>(null)
const initialScroll = ref(false)

const resetBodyStyles = () => {
  document.body.style.height = ''
  window.scrollTo(0, 0)
}

const resize = () => {
  if (!page.value) return

  const w = page.value.scrollWidth - window.innerWidth + window.innerHeight
  document.body.style.height = `${w}px`
}

const onScroll = () => {
  if (!page.value) return

  const y = document.body.getBoundingClientRect().top
  page.value.scrollLeft = -y

  if (!initialScroll.value) {
    initialScroll.value = true
    window.scrollTo(0, 0)
  }
}

onMounted(() => {
  page.value = document.getElementById('page') as HTMLElement

  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', resize)

  resize()

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', resize)
  resetBodyStyles()
})

onBeforeRouteLeave((to, from, next) => {
  resetBodyStyles()
  next()
})
</script>

<style scoped>
#page {
  overflow: hidden;
  white-space: nowrap;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  display: flex;
  flex-wrap: nowrap;
}
.pane {
  flex: 0 0 100vw;
  height: 100vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: rgb(33, 42, 88);
}
.pane:nth-child(4n + 2) {
  background-color: rgb(222, 213, 167);
}
.pane:nth-child(4n + 3) {
  background-color: rgb(33, 42, 88);
}
.pane:nth-child(4n + 4) {
  background-color: rgb(33, 42, 88);
}
.pane:last-child {
  background-color: rgb(222, 213, 167);
}
</style>
