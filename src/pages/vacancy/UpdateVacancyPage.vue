<template> 
  <Toast :baseZIndex="100000001"/>
  <div v-if="vacancyStore.loaderIsActive" class="spinner-centred">
    <spinner />
  </div>
  <div v-if="vacancyStore.data && !vacancyStore.loaderIsActive">
    <Card style="width: 55em; margin-left: 50px; padding: 0px 24px 0 24px;">
      <template #header>
        <div class="vacancy__header">
          <h4 class="vacancy__header-text">Edit Vacancy</h4>
        </div>
      </template>
      <template #title>
        <Divider />
      </template>
      <template #content>
        <div class="vacancy__content"> 
          <form @submit.prevent="handleSubmit()">
            <div class="p-fluid">
              <div class="field">
                <label for="company-name" :class="{'p-error': vacancyStore.vacancy.companyName.length === 0 && submitted}">Company Name</label>
                <InputText id="company-name" class="inputs_first" v-model="vacancyStore.vacancy.companyName" required  v-tooltip.bottom="'Company'" :class="{'p-invalid': vacancyStore.vacancy.companyName.length === 0 && submitted}"/>
              </div>
              <div class="field">
                <label for="job-name" :class="{'p-error': vacancyStore.vacancy.jobName.length === 0 && submitted}">Job Name</label>
                <InputText id="job-name" class="inputs_first" v-model="vacancyStore.vacancy.jobName" required v-tooltip.bottom="'Job'" :class="{'p-invalid': vacancyStore.vacancy.jobName.length === 0 && submitted}"/>
              </div>
              <div class="field">
                <label for="city-name" :class="{'p-error': vacancyStore.vacancy.city.length === 0 && submitted}">City</label>
                <Dropdown 
                  id="city-name" 
                  class="inputs_first"
                  v-model="vacancyStore.vacancy.city"
                  :class="{'p-invalid': vacancyStore.vacancy.city.length === 0 && submitted}"
                  :options="cities" 
                  optionLabel="name" 
                  optionValue="code" 
                  placeholder="Select a City"
                />
              </div>
              <div class="field">
                <label for="skill-name" :class="{'p-error': vacancyStore.vacancy.skills.length === 0 && submitted}">Core Skills</label>
                <form class="form_list" @submit.prevent="addNew('skills')">
                  <InputText 
                    id="skill-name" 
                    class="inputs_first input_list"
                    v-tooltip.bottom="'Core skills'"
                    v-model="bSkill"
                    :class="{'p-invalid': vacancyStore.vacancy.skills.length === 0 && submitted}"
                    placeholder="For example: Java, SQL"
                  />
                  <Button class="btn_list" label="Add skill" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(skill, index) in vacancyStore.vacancy.skills" :key="index" class="li_list">
                    {{ skill.skill }} 
                    <span @click="deleteElement('skills' ,index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="require" :class="{'p-error': vacancyStore.vacancy.requirements.length === 0 && submitted}">Requirements</label>
                <form class="form_list" @submit.prevent="addNew('require')">
                  <InputText 
                    id="require" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'Requirements'"
                    v-model="reqName"
                    :class="{'p-invalid': vacancyStore.vacancy.requirements.length === 0 && submitted}"
                    placeholder="For example: Knowledge of the basics of DBMS"
                  />
                  <Button class="btn_list" label="Add requirement" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(req, index) in vacancyStore.vacancy.requirements" :key="index" class="li_list">
                    {{ req.reqName}} 
                    <span @click="deleteElement('require', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="response" :class="{'p-error': vacancyStore.vacancy.dependencies.length === 0 && submitted}">Dependencies</label>
                <form class="form_list" @submit.prevent="addNew('dependency')">
                  <InputText 
                    id="response" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'dependencies'"
                    v-model="depName"
                    :class="{'p-invalid': vacancyStore.vacancy.dependencies.length === 0 && submitted}"
                    placeholder="For example: Full Time or Remote Work"
                  />
                  <Button class="btn_list" label="Add dependency" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(dep, index) in vacancyStore.vacancy.dependencies" :key="index" class="li_list">
                    {{ dep.depName }} 
                    <span @click="deleteElement('dependency', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="condition" :class="{'p-error': vacancyStore.vacancy.conditions.length === 0 && submitted}">Work Conditions</label>
                <form class="form_list" @submit.prevent="addNew('condition')">
                  <InputText 
                    id="condition" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'Work Conditions'"
                    v-model="conName"
                    :class="{'p-invalid': vacancyStore.vacancy.conditions.length === 0 && submitted}"
                    placeholder="For example: Official employment"
                  />
                  <Button class="btn_list" label="Add condition" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(con, index) in vacancyStore.vacancy.conditions" :key="index" class="li_list">
                    {{ con.conName }} 
                    <span @click="deleteElement('condition', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <router-link :to="{ name: 'home'}" v-slot="{navigate}">
              <Button class="btn_list" label="Back" style="margin-right: 8px;" @click="navigate"/>
            </router-link>
            <Button type="submit" class="btn_list" label="Edit" />
          </form>
        </div>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, ref } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { useRouter } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import Spinner from '@/components/spinner/Spinner.vue'
  import InputText from 'primevue/inputtext'
  import Dropdown from 'primevue/dropdown'
  import Divider from 'primevue/divider'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast';
  import Card from 'primevue/card'

  export default defineComponent({
    components: {
      InputText,
      Dropdown,
      Divider,
      Spinner,
      Button,
      Toast,
      Card,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props: any) {
      const router = useRouter()
      const toast = useToast()
      const bSkill = ref('')
      const reqName = ref('')
      const depName = ref('')
      const conName = ref('')
      const vacancyStore = vacancyModuleStore()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      const errorMessage = ref('')
      const submitted = ref(false)

      const cities = ref([
        {name: 'Almaty', code: 'Almaty'},
        {name: 'Astana', code: 'Astana'},
        {name: 'Shymkent', code: 'Shymkent'}
      ])

      const showMessage = (
        severity: string,
        summary: string,
        detail: string,
        life: number,
        ) => {
          toast.add({ severity: severity, summary: summary, detail: detail, life: life })
      }

      const addNew = (name: any) => {
        if (name === 'skills') {
          if (bSkill) {
            let skill = { skill: bSkill.value }
            vacancyStore.vacancy.skills.push(skill)
          }
          bSkill.value = ''
        } else if (name === 'require') {
          if (reqName) {
            let req = { reqName: reqName.value }
            vacancyStore.vacancy.requirements.push(req)
          }
          reqName.value = ''

        } else if (name === 'dependency') {
          if (depName) {
            let dep = { depName: depName.value }
            vacancyStore.vacancy.dependencies.push(dep)
          }
          depName.value = ''
        } else {
          if (conName) {
            let con = { conName: conName.value }
            vacancyStore.vacancy.conditions.push(con)
          }
          conName.value = ''
        }
      }

      const deleteElement = (name:any, index:number) => {
        if (name === 'skills') {
          vacancyStore.vacancy.skills.splice(index, 1)
        } else if (name === "require") {
          vacancyStore.vacancy.requirements.splice(index, 1)
        } else if (name === 'dependency') {
          vacancyStore.vacancy.dependencies.splice(index, 1)
        } else {
          vacancyStore.vacancy.conditions.splice(index, 1)
        }
      }

      const handleSubmit = () => {
        submitted.value = true
        let storageVacancy = JSON.parse(<string>sessionStorage.getItem('vacancy'))
        if (_.isEqual(vacancyStore.vacancy, storageVacancy)) {
          showMessage('info', 'Info Message', 'Nothing changed !', 2000)
          return
        } else {
          if (vacancyStore.vacancy.city.length === 0 || vacancyStore.vacancy.skills.length === 0
              || vacancyStore.vacancy.requirements.length === 0 || vacancyStore.vacancy.dependencies.length === 0
                || vacancyStore.vacancy.conditions.length === 0) {
                  
                  showMessage('error', 'Error Message', 'Fill in all the fields !', 2000)
                  return
          }
        }
        updateVacancy()
        sessionStorage.setItem('vacancy', JSON.stringify(vacancyStore.vacancy))
      }

      function updateVacancy() {
        const vacancy = {
          id: vacancyStore.vacancy.id,
          username: currentUser.value,
          companyName: vacancyStore.vacancy.companyName,
          jobName: vacancyStore.vacancy.jobName,
          city: vacancyStore.vacancy.city,
          basicSkills: vacancyStore.vacancy.skills,
          requirements: vacancyStore.vacancy.requirements,
          dependencies: vacancyStore.vacancy.dependencies,
          conditions: vacancyStore.vacancy.conditions,
        } as any
        vacancyStore.updateVacancy(vacancy).then(
          () => {
            showMessage('success', 'Success Message', 'Updated successfully !', 3000)
            router.push({
              name: 'myVacancy'
            })
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 3000)
          },
        )
      }
      
      onMounted(async () => {
        await vacancyStore.getDataWithID(props.id)
      })

      return {
        deleteElement,
        handleSubmit,
        errorMessage,
        vacancyStore,
        submitted,
        reqName,
        conName,
        depName,
        cities,
        bSkill,
        addNew,
      }
    },
  })
</script>

<style lang="scss" src="./updVacancyPage.scss" scoped></style>