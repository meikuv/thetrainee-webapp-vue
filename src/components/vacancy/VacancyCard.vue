<template>
  <Toast :baseZIndex="100000001"/>
  <ConfirmPopup></ConfirmPopup>
  <article class="vacancy-card">
    <div class="tp-vacancy-card-item">
      <div class="tp-vacancy-card-top">
        <div class="tp-vacancy-card-top__left">
          <!-- <img class="tp-vacancy-card-image" src="data:image/png;base64,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"/> -->
          <img src="http://localhost:5173/src/assets/icons8-company-100.png" width="64" height="64"/>
        </div>
        <router-link
          v-if="vacancy.id"  :to="{ name: 'vacancyPage', params: { id: vacancy.id } }"
        >
          <div class="tp-vacancy-card-top__right">
            <a href="https://www.google.com/" class="tp-vacancy-card-company-link">{{ vacancy.companyName }}</a>
            <h2 class="tp-vacancy-card-title">
              {{ vacancy.jobName }}
            </h2>
          </div>
        </router-link>
      </div>
      <div class="tp-vacancy-card-center">
        <span class="tp-card-badge" v-for="(dep, index) in vacancy.dependencies" :key="index">
          {{ dep.depName }}
        </span>
      </div>
      <div class="tp-vacancy-card-bottom">
        <Button label="Respond" class="p-btn" v-if="userRole === 'USER_ROLE'" @click="openModal()"/>
        <Button 
          label="Delete" class="p-btn" 
          v-if="currentUser === vacancy.username && userRole === 'COMPANY_ROLE'"
          @click="confirm1($event, vacancy.id)"
        />
        <Button 
          label="Contact" 
          class="p-btn" 
          v-if="currentUser !== vacancy.username && userRole === 'COMPANY_ROLE'"
        />
        <div class="tp-vacancy-card-skills" v-for="(skill, index) in vacancy.skills.slice(0, 4)" :key="index">
          <div class="round-divider"></div>
          <span>
            {{ skill.skill }}
          </span>
        </div>
      </div>
    </div>
  </article>
  <Dialog header="Select resume" v-model:visible="displayModal" :style="{ width: '30vw'}" :modal="true">
    <div class="resume-card" v-for="(res, index) in resumeStore.userResumes" :key="index">
      <div class="resume-info-text">
        <h5 class="resume-position-text">{{ res.position }}</h5>
        <router-link :to="{ name: 'myResumes'}">
          <a class="view-resume-text">View resume</a>
        </router-link>
      </div>
      <Button 
        icon="pi pi-check" :loading="loading === res.id"
        text rounded aria-label="Filter" style="font-size: 5px;" 
        @click="respondVacancy(res.id)"
        :key="index"
      />
    </div>
  </Dialog>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { useToast } from 'primevue/usetoast'
  import { useConfirm } from 'primevue/useconfirm'
  import ConfirmPopup from 'primevue/confirmpopup'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'

  export default defineComponent({
    props: {
      vacancy: {
        type: Object,
        default: () => {},
        required: true,
      }
    },
    components: {
      ConfirmPopup,
      Dialog,
      Button,
      Toast,
    },
    setup(props) {
      const loading = ref(0)
      const errorMessage = ref('')
      const vacancy = props.vacancy
      const toast = useToast()
      const confirm = useConfirm()
      const displayModal = ref(false)
      const authUserStore = authModuleStore()
      const vacancyStore = vacancyModuleStore()
      const resumeStore = resumeModuleStore()
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))
      const currentUser = computed(() => authUserStore.currentUser)

      resumeStore.getUserResumes(currentUser.value)

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      const openModal = () => {
        displayModal.value = true;
      }

      const confirm1 = (event: any, id: number) => {
        confirm.require({
          target: event.currentTarget,
          message: 'Are you sure you want to delete the vacancy ?',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            deleteVacancy(id)
          },
          reject: () => {
          }
        })
      }

      function deleteVacancy(id: number) {
        vacancyStore.deleteVacancy(id).then(
          () => {
            showMessage('info', 'Confirmed', 'Vacancy deleted', 2000)
          },
          error => {
            showMessage('error', 'Error Message', 'Something wrong !', 3000)
          }
        )
      }

      function respondVacancy(resumeId: number) {
        loading.value = resumeId
        const respond = {
          vacancyId: vacancy.id,
          companyName: vacancy.companyName,
          username: currentUser.value,
          resumeId: resumeId,
          jobName: vacancy.jobName,
        }
        vacancyStore.respondVacancy(respond).then(
          () => {
            setTimeout(() => {
                loading.value = 0
                showMessage('success', 'Success', 'Responded', 2000)
            }, 500);
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            setTimeout(() => {
              loading.value = 0
              showMessage('error', 'Error', errorMessage.value, 2000)
            }, 500)
          }
        )
      }

      return {
        respondVacancy,
        authUserStore,
        deleteVacancy,
        displayModal,
        currentUser,
        resumeStore,
        openModal,
        userRole,
        confirm1,
        vacancy,
        loading,
      }
    }
  })
</script>

<style lang="scss" src="./vacancyCard.scss" scoped></style>