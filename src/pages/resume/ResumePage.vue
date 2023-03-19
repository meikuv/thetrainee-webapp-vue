<template>
  <div v-if="resumeStore.loaderIsActive" class="spinner-centred">
    <Spinner />
  </div>
  <div class="resume-wrapper">
    <div v-if="!resumeStore.loaderIsActive && resumeStore.resume">
      <article class="single-resume">
        <div class="single__header">
          <h3 itemprop="headline">{{ resumeStore.resume.lastName }} {{ resumeStore.resume.firstName }}</h3>
          <p class="single__header-personal">
            <span class="resume-personal-gender">{{ resumeStore.resume.gender }}</span>
            <span>, was born </span>
            <span class="resume-personal-birthDate"> {{ resumeStore.resume.birthDate }}</span>
          </p>
          <p class="single__header-contact">
            <p class="contact-text">Contacts</p>
            <span>+7{{ resumeStore.resume.phone }}</span>
          </p>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed } from 'vue'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { authModuleStore } from '@/store/authModule'
  import { profileModuleStore } from '@/store/profileModule'
  import Divider from 'primevue/divider'
  import Spinner from '@/components/spinner/Spinner.vue'
  import Button from 'primevue/button'

  export default defineComponent({
    components: {
      Divider,
      Spinner,
      Button,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props: any) {
      const resumeStore = resumeModuleStore()
      const authUserStore = authModuleStore()
      const profileStore = profileModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      onMounted(async () => {
        await resumeStore.getResumeWithId(props.id)
        await profileStore.getUserInfo(currentUser.value)
      })
      return {
        resumeStore,
      }
    }
  })
</script>

<style lang="scss" src="./resumePage.scss" scoped></style>