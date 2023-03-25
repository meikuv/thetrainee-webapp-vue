<template>
  <Toast />
  <ConfirmPopup></ConfirmPopup>
  <div v-if="vacancyStoreData.loaderIsActive" class="spinner-centred">
      <spinner />
  </div>
  <div class="vacancy-wrapper">
    <div v-if="!vacancyStoreData.loaderIsActive && vacancyStoreData.vacancy">
      <article class="single-vacancy">
        <div class="single__header">
          <h1 itemprop="headline">{{ vacancyStoreData.vacancy.jobName }}</h1>
          <div class="vacancy-meta">
            <span class="vacancy-depend" v-for="(item, index) in vacancyStoreData.vacancy.dependencies" :key="index">
              {{ item.depName }}
            </span>
          </div>
          <div class="post-actions">
            <Button label="Respond" class="p-btn-label btn" @click="openModal()" v-if="userRole === 'USER_ROLE'"/>
            <Button 
              label="Delete" class="p-btn-label btn"
              v-if="currentUser === vacancyStoreData.vacancy.username && userRole === 'COMPANY_ROLE'"
              @click="confirm1($event, vacancyStoreData.vacancy.id)"
            />
            <router-link :to="{ name: 'updVacancyPage', params: { id: vacancyStoreData.vacancy.id } }" v-slot="{navigate}">
              <Button 
                label="Edit" class="p-btn-label btn"
                v-if="currentUser === vacancyStoreData.vacancy.username && userRole === 'COMPANY_ROLE'"
                @click="navigate"
                style="margin-left: 10px;"
              />
            </router-link>
            <Button label="Contact" 
              class="p-btn-label btn" 
              v-if="userRole === 'COMPANY_ROLE' && currentUser !== vacancyStoreData.vacancy.username"
            />
          </div>
        </div>
        <div class="single__content">
          <h3>Basic skills</h3>
          <div class="content-header">
            <div class="skills" v-for="(item, index) in vacancyStoreData.vacancy.skills" :key="index">
              <div class="round-divider"></div>
              <span>{{ item.skill }}</span>
            </div>
          </div>
          <h3>Requirements, required skills</h3>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.vacancy.requirements" :key="index">
              {{ item.reqName }};
            </li>
          </ul>
          <h3>Work conditions</h3>
          <ul>
            <li v-for="(item, index) in vacancyStoreData.vacancy.conditions" :key="index">
              {{ item.conName }};
            </li>
          </ul>
        </div>
      </article>
    </div>
  </div>
  <aside class="aside-right" v-if="!vacancyStoreData.loaderIsActive && vacancyStoreData.vacancy">
    <div class="box widget-about-company">
      <a>
        <img src="http://localhost:5173/src/assets/icons8-company-100.png" width="100" height="100"/>
      </a>
      <div class="widget-caption">
        <a class="widget-caption-a">
          {{ vacancyStoreData.vacancy.companyName }}
        </a>
      </div>
      <div class="widget-text small">
        {{ profileStore.profileInfo.about }}
      </div>
      <div class="about-company-jobs">
        <div class="about-company-jobs-list">
          <div 
            class="about-company-jobs-item-last-jobs" 
            v-for="(item, index) in vacancyStoreData.vacancy.compVacancy"
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
  import { defineComponent, computed, ref } from 'vue'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { authModuleStore } from '@/store/authModule'
  import { useConfirm } from 'primevue/useconfirm'
  import { useToast } from 'primevue/usetoast'
  import ConfirmPopup from 'primevue/confirmpopup'
  import SplitButton from 'primevue/splitbutton'
  import Spinner from '@components/spinner/Spinner.vue'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
import { profileModuleStore } from '@/store/profileModule'

  export default defineComponent({  
    components: {
      ConfirmPopup,
      SplitButton,
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
      const confirm = useConfirm()
      const authUserStore = authModuleStore()
      const resumeStore = resumeModuleStore()
      const profileStore = profileModuleStore()
      const vacancyStoreData = vacancyModuleStore()
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))
      const currentUser = computed(() => authUserStore.currentUser)
      
      profileStore.getUserInfo(currentUser.value)
      resumeStore.getUserResumes(currentUser.value)
      vacancyStoreData.getDataWithID(props.id)

      const items = [
        {
          label: 'Delete',
          icon: 'pi pi-trash',
          command: () => {
            toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
          }
        }
      ]

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
        vacancyStoreData.deleteVacancy(id).then(
          () => {
            showMessage('info', 'Confirmed', 'Vacancy deleted', 2000)
          },
          error => {
            showMessage('error', 'Error Message', 'Something wrong !', 2000)
          }
        )
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

      return { 
        vacancyStoreData,
        respondVacancy,
        profileStore,
        displayModal,
        resumeStore,
        currentUser,
        openModal,
        confirm1,
        userRole,
        loading,
        items,
      }
    }
  })
</script>

<style lang="scss" src="./vacancyPage.scss" scoped></style>