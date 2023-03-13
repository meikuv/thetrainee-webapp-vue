<template>
  <div v-if="data" ref="scrollComponent">
    <vacancy-card 
      v-for="(item, index) in data.slice(0, slice)"
      :key="index"
      :vacancy="item"
    />
  </div>
  <div v-if="data.length === 0" class="not-found">
    <img src="http:\\localhost:5173\src\assets\datanotfound.jpg"  width="650" height="650"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
  import VacancyCard from './VacancyCard.vue'
  import InputText from 'primevue/inputtext'

  export default defineComponent({
    props: {
      data: {
        type: Array,
        default: () => []
      },
    },
    
    components: {
       VacancyCard, 
       InputText,
    },

    setup(props) {
      const scrollComponent = ref(null)
      const slice = ref(4)

      const loadMoreVacancy = () => {
        slice.value += 3
      }

      onMounted(() => {
        window.addEventListener("scroll", handleScroll);
      })

      onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
      })

      const handleScroll = (e: any) => {
        let element = scrollComponent.value
        if (element.getBoundingClientRect().bottom < window.innerHeight) {
          loadMoreVacancy()
        }
      }
      
      return { scrollComponent, slice }
    }
  })
</script>

<style lang="scss" src="./vacancyList.scss" scoped></style>