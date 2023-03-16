<template>
    <div v-if="vacancyStoreData.$state.loaderIsActive" class="spinner-centred">
      <spinner />
    </div>
    <div v-if="vacancyStoreData.$state.data && !vacancyStoreData.$state.loaderIsActive" class="vacancy-wrapper">
      <vacancy-list :data="filterAllVacancy"/>
    </div>
    <aside class="aside-right aside-right--fix-bottom" v-if="!vacancyStoreData.$state.loaderIsActive">
    <div class="box tp-filter-box filter-page filter-page__jobs">
      <div class="filter-block filter-block--search">
        <div class="filter-block__title">Search by Company</div>
        <div class="tp-input tp-input--primary tp-input--small">
          <InputText id="inputtext" type="text" v-model="compName" placeholder="For example, Kaspi.kz"/>
        </div>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, computed } from 'vue'
  import { vacancyModuleStore } from '../../store/vacancyModule';
  import Spinner from '../../components/spinner/Spinner.vue';
  import VacancyList from '../../components/vacancy/VacancyList.vue'
  import InputText from 'primevue/inputtext';

  export default defineComponent({
    components: {
      VacancyList,
      InputText,
      Spinner,
    }, 
    
    setup() {
      const vacancyStoreData = vacancyModuleStore()
      const compName = ref('')

      const filterByCompName = (allVacancy: any) => {
        return compName.value
          ? allVacancy.filter(
            (vacancy: any) => 
              vacancy.companyName.toLowerCase().includes(compName.value.toLowerCase()))
          : allVacancy
      }

      const filterAllVacancy = computed(() => {
        return filterByCompName(
          vacancyStoreData.$state.data
        )
      })

      onMounted(async function() {
        await vacancyStoreData.getDataFromApi()
      })

      return { filterAllVacancy, compName, vacancyStoreData }
    },

  })
</script>

<style lang="scss" src="./allVacancyPage.scss" scoped></style>