<template>
  <Toast :baseZIndex="100000001"/>
  <Card style="width: 60em; margin-left: 50px; padding: 0px 24px 0 24px;">
    <template #header>
      <div class="vacancy__header">
        <h4 class="vacancy__header-text">Create Vacancy</h4>
      </div>
    </template>
    <template #title>
      <Divider />
    </template>
    <template #content>
      <div class="vacancy__content"> 
        <form @submit.prevent="handleSubmit(!v$.$invalid)">
          <div class="p-fluid">
            <div class="field">
              <label for="company-name" :class="{'p-error': v$.companyName.$invalid && submitted}">Company Name</label>
              <InputText id="company-name" class="inputs_first" v-model="v$.companyName.$model"  v-tooltip.bottom="'Company'" :class="{'p-invalid': v$.companyName.$invalid && submitted}"/>
            </div>
            <div class="field">
              <label for="job-name" :class="{'p-error': v$.jobName.$invalid && submitted}">Job Name</label>
              <InputText id="job-name" class="inputs_first" v-model="v$.jobName.$model" v-tooltip.bottom="'Job'" :class="{'p-invalid': v$.jobName.$invalid && submitted}"/>
            </div>
            <div class="field">
              <label for="city-name" :class="{'p-error': v$.city.$invalid && submitted}">City</label>
              <Dropdown 
                id="city-name" 
                class="inputs_first"
                v-model="v$.city.$model"
                :class="{'p-invalid': v$.city.$invalid && submitted}"
                :options="cities" 
                optionLabel="name" 
                optionValue="code" 
                placeholder="Select a City"
              />
            </div>
            <div class="field">
              <label for="skill-name">Core Skills</label>
              <form class="form_list" @submit.prevent="addNew('skills')">
                <InputText 
                  id="skill-name" 
                  class="inputs_first input_list"
                  v-tooltip.bottom="'Core skills'"
                  v-model="v$.bSkill.$model"
                  placeholder="For example: Java, SQL"
                />
                <Button class="btn_list" label="Add skill" type="submit"/>
              </form>
              <ul class="ul_list">
                <li v-for="(skill, index) in basicSkills" :key="index" class="li_list">
                  {{ skill.skill }} 
                  <span @click="deleteElement('skills' ,index)">
                    <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                  </span>
                </li>
              </ul>
            </div>
            <div class="field">
              <label for="require">Requirements</label>
              <form class="form_list" @submit.prevent="addNew('require')">
                <InputText 
                  id="require" 
                  class="inputs_second input_list"
                  v-tooltip.bottom="'Requirements'"
                  v-model="v$.reqName.$model"
                  placeholder="For example: Knowledge of the basics of DBMS"
                />
                <Button class="btn_list" label="Add requirement" type="submit"/>
              </form>
              <ul class="ul_list">
                <li v-for="(req, index) in requirements" :key="index" class="li_list">
                  {{ req.reqName}} 
                  <span @click="deleteElement('require', index)">
                    <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                  </span>
                </li>
              </ul>
            </div>
            <div class="field">
              <label for="response">Dependencies</label>
              <form class="form_list" @submit.prevent="addNew('dependency')">
                <InputText 
                  id="response" 
                  class="inputs_second input_list"
                  v-tooltip.bottom="'dependencies'"
                  v-model="v$.depName.$model"
                  placeholder="For example: Full Time or Remote Work"
                />
                <Button class="btn_list" label="Add dependency" type="submit"/>
              </form>
              <ul class="ul_list">
                <li v-for="(dep, index) in dependencies" :key="index" class="li_list">
                  {{ dep.depName }} 
                  <span @click="deleteElement('dependency', index)">
                    <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                  </span>
                </li>
              </ul>
            </div>
            <div class="field">
              <label for="condition">Work Conditions</label>
              <form class="form_list" @submit.prevent="addNew('condition')">
                <InputText 
                  id="condition" 
                  class="inputs_second input_list"
                  v-tooltip.bottom="'Work Conditions'"
                  v-model="v$.conName.$model"
                  placeholder="For example: Official employment"
                />
                <Button class="btn_list" label="Add condition" type="submit"/>
              </form>
              <ul class="ul_list">
                <li v-for="(con, index) in conditions" :key="index" class="li_list">
                  {{ con.conName }} 
                  <span @click="deleteElement('condition', index)">
                    <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <Button type="submit" class="btn_list" label="Create and Publish" />
        </form>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, computed } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { vacancyModuleStore } from '@/store/vacancyModule'
  import { required } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import { useToast } from 'primevue/usetoast'
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
      Button,
      Toast,
      Card,
    },
    setup() {
      const toast = useToast()
      const basicSkills: any = ref([])
      const requirements: any = ref([])
      const dependencies: any = ref([])
      const conditions: any = ref([])
      const vacancyStore = vacancyModuleStore()
      const authUserStore = authModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)

      const state = reactive({
        companyName: '',
        jobName: '',
        city: '',
        bSkill: '',
        reqName: '',
        depName: '',
        conName: '',
      })

      const rules = {
        companyName: { required },
        jobName: { required },
        city: { required },
        bSkill: '',
        reqName: '',
        depName: '',
        conName: '',
      }

      const errorMessage = ref('')
      const submitted = ref(false)
      const v$ = useVuelidate(rules, state) as any

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
          if (state.bSkill) {
            let skill = { skill: state.bSkill }
            basicSkills.value.push(skill)
          }
          state.bSkill = ''
        } else if (name === 'require') {
          if (state.reqName) {
            let req = { reqName: state.reqName}
            requirements.value.push(req)
          }
          state.reqName = ''

        } else if (name === 'dependency') {
          if (state.depName) {
            let dep = { depName: state.depName}
            dependencies.value.push(dep)
          }
          state.depName = ''
        } else {
          if (state.conName) {
            let con = { conName: state.conName}
            conditions.value.push(con)
          }
          state.conName = ''
        }
      }

      const deleteElement = (name:any, index:number) => {
        if (name === 'skills') {
          basicSkills.value.splice(index, 1)
        } else if (name === "require") {
          requirements.value.splice(index, 1)
        } else if (name === 'dependency') {
          dependencies.value.splice(index, 1)
        } else {
          conditions.value.splice(index, 1)
        }
      }

      const handleSubmit = (isFormValid: boolean) => {
        submitted.value = true
        if (!isFormValid) {
          showMessage('error', 'Error Message', 'Fill in the required fields', 3000)
          return
        }
        createVacancy()
      }

      const resetForm = () => {
          state.companyName = ''
          state.city = ''
          state.jobName = ''
          basicSkills.value = []
          requirements.value = []
          conditions.value = []
          dependencies.value = []
          submitted.value = false
      }

      function createVacancy() {
        const vacancy = {
          username: currentUser.value,
          companyName: state.companyName,
          jobName: state.jobName,
          city: state.city,
          basicSkills: basicSkills.value,
          requirements: requirements.value,
          dependencies: dependencies.value,
          conditions: conditions.value,
        } as any
        vacancyStore.createVacancy(vacancy).then(
          () => {
            showMessage('success', 'Success Message', 'Created successfully !', 3000)
            resetForm()
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 3000)
          },
        )
      }

      return {
        dependencies,
        deleteElement,
        requirements,
        handleSubmit,
        errorMessage,
        basicSkills,
        conditions,
        submitted,
        cities,
        addNew,
        state,
        v$,
      }
    },
  })
</script>

<style lang="scss" src="./createVacancyPage.scss" scoped></style>