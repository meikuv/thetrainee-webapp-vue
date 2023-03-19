<template>
  <Toast />
  <div v-if="profileData.$state.loaderIsActive" class="spinner-centred">
    <spinner />
  </div>
  <Card style="width: 55em; margin-left: 40px; padding: 0px 24px 0 24px;" v-if="!profileData.$state.loaderIsActive">
    <template #header>
      <div class="about-details__header">
        <h5 class="about-details__header-text">Personal Information</h5>
      </div>
    </template>
    <template #title>
      <Divider />
    </template>
    <template #content>
      <div class="about-details__content">
        <form @submit.prevent="handleSubmit()" class="p-fluid">
          <div class="p-fluid">
            <div class="field" v-if="userRole === 'USER_ROLE'">
              <label for="lastname">Last Name</label>
              <InputText id="lastname" v-model="getProfileInfo.lastName" :value="getProfileInfo.lastName"/>
            </div>
            <div class="field" v-if="userRole === 'USER_ROLE'">
              <label for="firstname">First Name</label>
              <InputText id="firstname" v-model="getProfileInfo.firstName" :value="getProfileInfo.firstName"/>
            </div>
            <div class="field" v-if="userRole === 'COMPANY_ROLE'">
              <label for="companyName">Company</label>
              <InputText id="companyName" v-model="getProfileInfo.companyName" :value="getProfileInfo.companyName"/>
            </div>
            <div class="field">
              <label for="email">Email Address</label>
              <InputText id="email" v-model="getProfileInfo.email" :value="getProfileInfo.email"/>
            </div>
            <div class="field">
              <label for="phone">Phone</label>
              <InputMask id="phone" mask="(999) 999-9999" v-model="getProfileInfo.phone" :value="getProfileInfo.phone" placeholder="(999) 999-9999" />
            </div>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-telegram"></i>
              </span>
              <InputText v-model="getProfileInfo.userTelegram" :value="getProfileInfo.userTelegram"/>
            </div>
            <div class="p-inputgroup" v-if="userRole === 'USER_ROLE'">
              <span class="p-inputgroup-addon">
                <i class="pi pi-github"></i>
              </span>
              <InputText v-model="getProfileInfo.userGithub" :value="getProfileInfo.userGithub"/>
            </div>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-instagram"></i>
              </span>
              <InputText v-model="getProfileInfo.userInstagram" :value="getProfileInfo.userInstagram"/>
            </div>
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-linkedin"></i>
              </span>
              <InputText v-model="getProfileInfo.userLinkedIn" :value="getProfileInfo.userLinkedIn"/>
            </div>
          </div>
          <Button class="upd-btn" label="Update" type="submit"/>
        </form>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, ref } from 'vue'
  import { profileModuleStore } from '@/store/profileModule'
  import { authModuleStore } from '@/store/authModule'
  import { useToast } from 'primevue/usetoast'
  import Spinner from '../../components/spinner/Spinner.vue';
  import InputText from 'primevue/inputtext'
  import InputMask from 'primevue/inputmask'
  import Divider from 'primevue/divider'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
  import Card from 'primevue/card'

  export default defineComponent({
    components: {
      InputText,
      InputMask,
      Divider,
      Spinner,
      Button,
      Toast,
      Card,
    },

    setup() {
      const toast = useToast()
      const profileData = profileModuleStore()
      const authUserStore = authModuleStore()
      const getProfileInfo: any = computed(() => profileData.getProfileInfo)
      const profileInfo: any = computed(() => profileData.getStorageInfo)
      const currentUser = computed(() => authUserStore.getCurrentUser)
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))

      const submitted = ref(false)
      const errorMessage = ref('')

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      const handleSubmit = () => {
        submitted.value = true
        function hasChanged() {
          return Object.keys(getProfileInfo.value)
            .some(field => (getProfileInfo.value[field] || null) !== profileInfo.value[field])
        }
        console.log(profileInfo.value['userGithub'], getProfileInfo.value['userGithub'])
        if (hasChanged()) {
          userInfoUpdate()
        } else {
          showMessage('info', 'Info', 'Nothing changed !', 2000)
        }
      }

      function userInfoUpdate() {
        const userInfo = {
          username: currentUser.value,
          email: getProfileInfo.value.email,
          lastName: getProfileInfo.value.lastName,
          firstName: getProfileInfo.value.firstName,
          companyName: getProfileInfo.value.companyName,
          userGithub: getProfileInfo.value.userGithub,
          userInstagram: getProfileInfo.value.userInstagram,
          userTelegram: getProfileInfo.value.userTelegram,
          userLinkedIn: getProfileInfo.value.userLinkedIn,
          phone: getProfileInfo.value.phone,
        } as any
        profileData.userProfileUpdate(userInfo).then(
          () => {
            showMessage('success', 'Success Message', 'Updated successfully !', 1000)
            setTimeout(() => {
              location.reload()
            }, 900)
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 2000)
          },
        )
      }

      onMounted(async () => {
        await profileData.getUserInfo(currentUser.value)
      }) 

      return {
        getProfileInfo,
        handleSubmit,
        profileData,
        submitted,
        userRole,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .spinner-centred {
    position: absolute;
    left: 60%;
    top: 40%;
  }
  .p-card {
    background-color: #f8f9fa;
    border-radius: 10px;
    border: 1px solid #dee2e6;
    opacity: 0;
    transition: 0.3s;
    animation: show 0.3s 1;
    animation-fill-mode: forwards;
    animation-delay: 0.3s;
    height: max-content;
  }

  @keyframes show {
    0% {
      opacity: 0;
    } 100% {
      opacity: 1;
    }
  }

  .about-details__header {
    display: flex;
  }

  .about-details__header-text {
    margin: 15px 30px 0 15px;
    color: #23272a;
    font-size: x-large;
  }

  .about-details__content {
    margin-left: 0 auto;
  }

  .field {
    margin-bottom: 1em;
  }

  .field>label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .p-fluid .p-inputtext {
    width: 100%;
  }

  .p-inputgroup {
    margin-top: 20px;
    width: 100%;
  }

  .upd-btn {
    margin-top: 20px;
    width: 120px;
    color: #f8f9fa;
    font-size: 15;
  }
</style>