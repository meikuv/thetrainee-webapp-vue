<template>
  <Toast :baseZIndex="100000001"/>
  <div style="display: flex; flex-direction: row;">
    <article class="resume-card">
      <div class="tp-resume-card-item">
        <div class="tp-resume-card-top">
          <!-- <router-link
            :to="{ name: 'resumePage', params: { id: resume.id } }"
          > -->
            <div class="tp-resume-card-top__right">
              <h2 class="tp-resume-card-title">
                {{ resume.position }}
              </h2>
            </div>
          <!-- </router-link> -->
        </div>
        {{ resume.salary }} {{ resume.salaryMode }}

        <div class="tp-resume-card-center">
          <span class="tp-card-badge" v-for="(skill, index) in resume.coreSkills" :key="index">
            {{ skill.skill }}
          </span>
        </div>
      </div>
    </article>
    <i class="pi pi-trash" style="font-size: 20px; margin: 5px 20px;" @click="deleteResume(resume.id)"></i>
  </div>
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
      }
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
            location.reload()
          },
          error => {
            showMessage('error', 'Error Message', 'Something wrong !', 3000)
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