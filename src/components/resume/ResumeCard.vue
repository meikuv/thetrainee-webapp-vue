<template>
  <Toast :baseZIndex="100000001"/>
  <article class="resume-card">
    <div class="tp-resume-card-item">
        <div class="tp-resume-card-top">
          <div class="tp-resume-card-top__left">
            <img src="http://localhost:5173/src/assets/icons8-user-100.png" width="64" height="64"/>
          </div>
          <router-link
            :to="{ name: 'resumePage', params: { id: resume.id } }"
          >
            <div class="tp-resume-card-top__right">
              <b class="tp-resume-card-position-link">{{ resume.position }}</b>
              <b class="tp-resume-card-title">
                {{ resume.salary }} {{ resume.salaryMode }}
              </b>
            </div>
          </router-link>
        </div>
      <div class="tp-resume-card-center">
        <span class="tp-card-badge" v-for="(skill, index) in resume.coreSkills" :key="index">
          {{ skill.skill }}
        </span>
      </div>
    </div>
  </article>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { useToast } from 'primevue/usetoast'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'

  export default defineComponent({
    props: {
      resume: {
        type: Object,
        default: () => {},
        required: true,
      },
    },
    components: {
      Button,
      Toast,
    },
    setup(props) {
      const toast = useToast()
      const displayModal = ref(false)
      const authUserStore = authModuleStore()
      const resumeStore = resumeModuleStore()
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))
      const currentUser = computed(() => authUserStore.currentUser)

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      function deleteResume(id: number) {
        resumeStore.deleteResume(id).then(
          () => {
            showMessage('info', 'Info Message', 'Resume deleted !', 2000)
          },
          error => {
            showMessage('error', 'Error Message', 'Something wrong !', 2000)
          }
        )
      }

      return {
        authUserStore,
        deleteResume,
        displayModal,
        currentUser,
        userRole,
      }
    }
  })
</script>

<style lang="scss" src="./resumeCard.scss" scoped></style>