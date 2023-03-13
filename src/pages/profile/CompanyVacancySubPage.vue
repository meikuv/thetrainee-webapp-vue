<template>
  <div v-if="vacancyStore.loaderIsActive" class="spinner-centred">
    <spinner />
  </div>
  <div style="margin-left: 40px;" v-if="!vacancyStore.loaderIsActive && vacancyStore.data" class="company-vacancy">
    <vacancy-list :data="vacancyStore.$state.data" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, ref } from 'vue'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { authModuleStore } from '@/store/authModule'
  import VacancyList from '@/components/vacancy/VacancyList.vue'
  import Spinner from '@/components/spinner/Spinner.vue'

  export default defineComponent({
    components: {
      VacancyList,
      Spinner,
    },
    setup() {
      const vacancyStore = vacancyModuleStore()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      onMounted( async () => await vacancyStore.getCompanyVacancy(currentUser.value))

      return {
        vacancyStore,
        currentUser,
      }
    }
  })
</script>

<style lang="scss" scoped>
  .spinner-centred {
    position: absolute;
    left: 60%;
    top: 40%;
  }

  .company-vacancy {
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
</style>