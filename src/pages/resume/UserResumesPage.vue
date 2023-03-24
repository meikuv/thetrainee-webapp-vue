<template>
  <div v-if="resumeStore.$state.loaderIsActive" class="spinner-centred">
    <Spinner />
  </div>
  <div v-if="resumeStore.$state.userResumes && !resumeStore.$state.loaderIsActive" class="resume-wrapper">
    <resume-list :data="resumeStore.$state.userResumes"/>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { authModuleStore } from '@/store/authModule'
  import ResumeList from '@/components/resume/ResumeList.vue'
  import Spinner from '@/components/spinner/Spinner.vue'

  export default defineComponent({
    components: {
      ResumeList,
      Spinner,
    },
    setup() {
      const resumeStore = resumeModuleStore()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      resumeStore.getUserResumes(currentUser.value)

      return {
        resumeStore,
      }
    }
  })
</script>

<style lang="scss" src="./userResumesPage.scss" scoped></style>