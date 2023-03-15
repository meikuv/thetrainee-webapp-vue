<template>
  <Toast v-bind:base-z-index="10000001"/>
  <Card style="width: 25em;">
    <template #header>
      <div class="avatar">
        <Avatar 
          :label="currentUser?.slice(0, 1).toLocaleUpperCase()" 
          class="mr-5" 
          shape="circle"
        />
      </div>
    </template>
    <template #title>
      <div class="username-block">
        <h5 class="username-text">{{ currentUser }}</h5>
      </div>
    </template>
    <template #content>
      <div class="navigation-block">
        <PanelMenu :model="items" />
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, computed, ref } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { useToast } from 'primevue/usetoast'
  import PanelMenu from 'primevue/panelmenu'
  import Divider from 'primevue/divider'
  import Avatar from 'primevue/avatar'
  import Toast from 'primevue/toast'
  import Card  from 'primevue/card'

  export default defineComponent({
    components: {
      PanelMenu,
      Divider,
      Avatar,
      Toast,
      Card,
    },

    setup() {
      const toast = useToast()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)
      const userRole = computed(() => JSON.parse(authUserStore.getUserRole))
      const avatarLabel = currentUser.value?.slice(0, 1)

      const items = ref([
        {
          key: '0',
          label: 'Account Details',
          icon: 'pi pi-fw pi-user',
          to: '/profile',
          command: () => {
            toast.add({severity:'success', summary:'Clicked', detail:'Personal Information', life: 1000})
          },
        },
        {
          key: '1',
          label: 'My Resumes',
          icon: 'pi pi-fw pi-file',
          to: '/profile/myResumes',
          visible: () => { return String(userRole.value) == 'USER_ROLE'},
          command: () => {
            toast.add({severity:'success', summary:'Clicked', detail:'Resumes', life: 1000})
          },
        },
        {
          key: '2',
          label: 'Vacancy Responds',
          icon: 'pi pi-fw pi-check-circle',
          to: '/profile/vacancyResponds',
          visible: () => String(userRole.value) !== 'USER_ROLE',
          command: () => {
            toast.add({severity:'success', summary:'Clicked', detail:'Vacancy Responds', life: 1000})
          },
        },
        {
          key: '3',
          label: 'My Responds',
          icon: 'pi pi-fw pi-check-circle',
          to: '/profile/myResponds',
          visible: () => { return String(userRole.value) === 'USER_ROLE'},
          command: () => {
            toast.add({severity:'success', summary:'Clicked', detail:'Responds', life: 1000})
          },
        },
        {
          key: '4',
          label: 'My Vacancy',
          icon: 'pi pi-fw pi-file',
          to: '/profile/myVacancy',
          visible: () => { return String(userRole.value) !== 'USER_ROLE'},
          command: () => {
            toast.add({severity:'success', summary:'Clicked', detail:'Vacancy', life: 1000})
          },
        },
        {
          key: '5',
          label: 'Settings',
          items: [
            {
              key: '5_0',
              label: 'Change Password',
              icon: 'pi pi-fw pi-key',
              to: '/profile/changePassword',
              command: () => {
                toast.add({severity:'success', summary:'Clicked', detail:'ChangePassword', life: 1000})
              },
            }
          ]
        },
        {
          key: '6',
          label: 'Sign Out',
          icon: 'pi pi-fw pi pi-power-off',
          command: () => logOut()
        }
      ])

      function logOut(): void {
        authUserStore.logout()
        location.reload()
      }

      return { 
        authUserStore,
        avatarLabel,
        currentUser,
        items,
      }
    }
  })
</script>

<style lang="scss" src="./userProfile.scss" scoped></style>