<template>
  <Toolbar class="header-container">
    <template #start>
      <div class="header-start">
        <router-link :to="{ name: 'home' }" class="logo-text">
          The Trainee
        </router-link>
        <span class="p-input-icon-right">
          <i class="pi pi-search" />
          <InputText class="search-text" type="text" placeholder="Search" />
        </span>  
      </div>
    </template>
    <template #end>
      <div class="header-end">
        <router-link to="/home/createResume" custom v-slot="{ navigate }" v-if="userRole === 'USER_ROLE'">
          <Button label="Resume" icon="pi pi-plus" class="p-button-rounded p-button-danger" @click="navigate" role="link"/>
        </router-link>
        <router-link to="/home/createVacancy" custom v-slot="{ navigate }" v-if="userRole === 'COMPANY_ROLE'">
          <Button label="Vacancy" icon="pi pi-plus" class="p-button-rounded p-button-danger" @click="navigate" role="link"/>
        </router-link>
        <Button :label="currentUser" icon="pi pi-user" class="p-button" @click="pushToProfile"/>
        <Button icon="pi pi-power-off" @click="logOut"/>
      </div>
    </template>
  </Toolbar>
</template>

<script lang="ts">
  import { defineComponent, ref, computed }from 'vue'
  import { authModuleStore } from '@/store/authModule';
  import { useRouter } from 'vue-router'
  import SplitButton from 'primevue/splitbutton'
  import Toolbar from 'primevue/toolbar'
  import InputText from 'primevue/inputtext'
  import Button from 'primevue/button'

  export default defineComponent({
    components: {
      SplitButton,
      InputText,
      Toolbar,
      Button,
    },

    setup() {
      const router = useRouter()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))

      const items = ref([
        {
          label: 'Vacancy',
          icon: 'pi pi-megaphone'
        }, 
        {
          label: 'Resume',
          icon: 'pi pi-briefcase'
        } 
      ])

      function logOut(): void {
        authUserStore.logout()
      }

      function pushToProfile(): void {
        router.push({
          name: 'userInfo',
        })
      }

      return { items, currentUser, userRole, authUserStore, logOut, pushToProfile }
    }
  })
</script>

<style lang="scss" src="./headerTemplate.scss" scoped></style>