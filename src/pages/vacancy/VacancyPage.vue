<template>
  <Toast />
  <div v-if="vacancyStoreData.$state.loaderIsActive" class="spinner-centred">
      <spinner />
  </div>
  <div class="vacancy-wrapper">
    <div v-if="!vacancyStoreData.$state.loaderIsActive && vacancyStoreData.$state.vacancy">
      <article class="single-vacancy">
        <div class="single__header">
          <h1 itemprop="headline">{{ vacancyStoreData.$state.vacancy.jobName }}</h1>
          <div class="vacancy-meta">
            <span class="vacancy-depend" v-for="(item, index) in vacancyStoreData.$state.vacancy.dependencies" :key="index">
              {{ item.depName }}
            </span>
          </div>
          <div class="post-actions">
            <Button label="Respond" class="p-btn-label btn" @click="openModal()" />
          </div>
        </div>
        <div class="single__content">
          <h3>Basic skills</h3>
          <div class="content-header">
            <div class="skills" v-for="(item, index) in vacancyStoreData.$state.vacancy.skills" :key="index">
              <div class="round-divider"></div>
              <span>{{ item.skill }}</span>
            </div>
          </div>
          <h3>Requirements, required skills</h3>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.$state.vacancy.requirements" :key="index">
              {{ item.reqName }};
            </li>
          </ul>
          <h3>Work conditions</h3>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.$state.vacancy.conditions" :key="index">
              {{ item.conName }};
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
  <aside class="aside-right" v-if="!vacancyStoreData.$state.loaderIsActive && vacancyStoreData.$state.vacancy">
    <div class="box widget-about-company">
      <a>
        <img src="http://localhost:5173/src/assets/icons8-company-100.png" width="100" height="100"/>
      </a>
      <div class="widget-caption">
        <a class="widget-caption-a">
          {{ vacancyStoreData.$state.vacancy.companyName }}
        </a>
      </div>
      <div class="widget-text small">
        Kaspi.kz – это суперприложение, в котором собраны самые разные сервисы для ежедневных потребностей.
      </div>
      <div class="about-company-jobs">
        <div class="about-company-jobs-list">
          <div 
            class="about-company-jobs-item-last-jobs" 
            v-for="(item, index) in vacancyStoreData.$state.vacancy.compVacancy"
            :key="index"
          >
            <div class="about-company-jobs-item-last-jobs-info">
              <div class="about-company-jobs-title" v-for="(itm, index) in item.vacancy" :key="index">
                <a>
                  {{ itm.name }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
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
  import { defineComponent, onMounted, computed, ref } from 'vue'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { authModuleStore } from '@/store/authModule'
  import { useToast } from 'primevue/usetoast'
  import Spinner from '@components/spinner/Spinner.vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'

  export default defineComponent({  
    components: {
      Spinner,
      Dialog,
      Button,
      Toast,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props: any) {
      const toast = useToast()
      const loading = ref(0)
      const errorMessage = ref('')
      const displayModal = ref(false)
      const authUserStore = authModuleStore()
      const resumeStore = resumeModuleStore()
      const vacancyStoreData = vacancyModuleStore()
      const currentUser = computed(() => authUserStore.currentUser)

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

      function respondVacancy(resumeId: number) {
        loading.value = resumeId
        const respond = {
          vacancyId: vacancyStoreData.vacancy.id,
          companyName: vacancyStoreData.vacancy.companyName,
          username: currentUser.value,
          resumeId: resumeId,
          jobName: vacancyStoreData.vacancy.jobName,
        }
        vacancyStoreData.respondVacancy(respond).then(
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

      onMounted(async () => {
        await vacancyStoreData.getDataWithID(props.id)
        await resumeStore.getUserResumes(currentUser.value)
      })

      return { 
        vacancyStoreData,
        respondVacancy,
        displayModal,
        resumeStore,
        openModal,
        loading,
      }
    }
  })
</script>

<style lang="scss" src="./vacancyPage.scss" scoped></style>