<template>
  <div v-if="data" ref="scrollComponent">
    <div v-for="(item, index) in resumes.slice(0, slice)" style="display: flex; flex-direction: row;">
      <resume-card 
        :key="index"
        :resume="item"
      />
      <i class="pi pi-trash" style="font-size: 20px; margin: 5px 20px;" @click="deleteResume((item as any).id, index)"></i>
    </div>
  </div>
  <div v-if="data.length === 0" class="not-found">
    <img src="http:\\localhost:5173\src\assets\datanotfound.jpg"  width="600" height="600"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { useToast } from 'primevue/usetoast'
  import ResumeCard from './ResumeCard.vue'
  import InputText from 'primevue/inputtext'
  import Toast from 'primevue/toast'

  export default defineComponent({
    props: {
      data: {
        type: Array,
        default: () => []
      },
    },
    
    components: {
       ResumeCard, 
       InputText,
       Toast,
    },

    setup(props) {
      const resumes = props.data
      const toast = useToast()
      const resumeStore = resumeModuleStore()
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

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      function deleteResume(id: number, index: number) {
        resumeStore.deleteResume(id).then(
          () => {
            resumes.splice(index, 1)
            showMessage('success', 'Succes Message', 'Deleted', 1500)
          },
          error => {
            showMessage('error', 'Error Message', 'Something wrong !', 1500)
          }
        )
      }
      
      return { scrollComponent, deleteResume, resumes, slice }
    }
  })
</script>

<style lang="scss" src="./resumeList.scss" scoped></style>