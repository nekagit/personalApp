<!-- <template>
  <div class="grid xl:grid-cols-2 xl:w-[100%] w-full grid-cols-1 w[50%] mx-auto text-white">
    <div class="">
      <h1
        class="font-bold text-2xl"
        :class="{ 'float-end': position === 'right', 'text-center': position === 'center' }"
      >
        {{ sectionItem.title }}
      </h1>
    </div>
    <ABaseImgModal class="w-full h-fit my-auto" />
  </div>
  <div class="user-box xl:w-[50%] xl:mx-auto p-6">
    <p v-for="content in sectionItem.content" class="text-slate-400" :key="content">
      {{ content }}
    </p>
  </div>
  <button v-if="button" href="#" class="bg-white px-4 py-2 rounded float-right mx-6">
    {{ sectionItem.button }}
  </button>
</template>

<script setup lang="ts">
import ABaseImgModal from '../../organisms/OBaseImgModal.vue';

interface Section {
  title: string
  content: string[]
  button: string
}
export interface BaseSection {
  button?: boolean
  position: string
  sectionItem: Section
}
defineProps<BaseSection>()
</script>

<style lang="scss" scoped></style> -->
