<template> 
  <Toast :baseZIndex="100000001"/>
  <div v-if="vacancyStore.$state.loaderIsActive" class="spinner-centred">
    <spinner />
  </div>
  <div v-if="vacancyStore.$state.data && !vacancyStore.$state.loaderIsActive">
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
                <label for="company-name" :class="{'p-error': !getVacancy.companyName && submitted}">Company Name</label>
                <InputText id="company-name" class="inputs_first" v-model="getVacancy.companyName" required  v-tooltip.bottom="'Company'" :class="{'p-invalid': !getVacancy.companyName && submitted}"/>
              </div>
              <div class="field">
                <label for="job-name" :class="{'p-error': !getVacancy.jobName && submitted}">Job Name</label>
                <InputText id="job-name" class="inputs_first" v-model="getVacancy.jobName" required v-tooltip.bottom="'Job'" :class="{'p-invalid': !getVacancy.jobName && submitted}"/>
              </div>
              <div class="field">
                <label for="city-name" :class="{'p-error': !getVacancy.city && submitted}">City</label>
                <Dropdown 
                  id="city-name" 
                  class="inputs_first"
                  v-model="getVacancy.city"
                  :class="{'p-invalid': !getVacancy.city && submitted}"
                  :options="cities" 
                  optionLabel="name" 
                  optionValue="code" 
                  placeholder="Select a City"
                />
              </div>
              <div class="field">
                <label for="skill-name" :class="{'p-error': !getVacancy.skills && submitted}">Core Skills</label>
                <form class="form_list" @submit.prevent="addNew('skills')">
                  <InputText 
                    id="skill-name" 
                    class="inputs_first input_list"
                    v-tooltip.bottom="'Core skills'"
                    v-model="bSkill"
                    :class="{'p-invalid': !getVacancy.skills && submitted}"
                    placeholder="For example: Java, SQL"
                  />
                  <Button class="btn_list" label="Add skill" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(skill, index) in getVacancy.skills" :key="index" class="li_list">
                    {{ skill.skill }} 
                    <span @click="deleteElement('skills' ,index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="require" :class="{'p-error': !getVacancy.requirements && submitted}">Requirements</label>
                <form class="form_list" @submit.prevent="addNew('require')">
                  <InputText 
                    id="require" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'Requirements'"
                    v-model="reqName"
                    :class="{'p-invalid': !getVacancy.requirements && submitted}"
                    placeholder="For example: Knowledge of the basics of DBMS"
                  />
                  <Button class="btn_list" label="Add requirement" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(req, index) in getVacancy.requirements" :key="index" class="li_list">
                    {{ req.reqName}} 
                    <span @click="deleteElement('require', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="response" :class="{'p-error': !getVacancy.dependencies && submitted}">Dependencies</label>
                <form class="form_list" @submit.prevent="addNew('dependency')">
                  <InputText 
                    id="response" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'dependencies'"
                    v-model="depName"
                    :class="{'p-invalid': !getVacancy.dependencies && submitted}"
                    placeholder="For example: Full Time or Remote Work"
                  />
                  <Button class="btn_list" label="Add dependency" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(dep, index) in getVacancy.dependencies" :key="index" class="li_list">
                    {{ dep.depName }} 
                    <span @click="deleteElement('dependency', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="field">
                <label for="condition" :class="{'p-error': !getVacancy.conditions && submitted}">Work Conditions</label>
                <form class="form_list" @submit.prevent="addNew('condition')">
                  <InputText 
                    id="condition" 
                    class="inputs_second input_list"
                    v-tooltip.bottom="'Work Conditions'"
                    v-model="conName"
                    :class="{'p-invalid': !getVacancy.conditions && submitted}"
                    placeholder="For example: Official employment"
                  />
                  <Button class="btn_list" label="Add condition" type="submit"/>
                </form>
                <ul class="ul_list">
                  <li v-for="(con, index) in getVacancy.conditions" :key="index" class="li_list">
                    {{ con.conName }} 
                    <span @click="deleteElement('condition', index)">
                      <i class="pi pi-trash" style="color: red; font-size: 12px;"></i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
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
      const getVacancy = computed(() => vacancyStore.getVacancy)
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
            getVacancy.value.skills.push(skill)
          }
          bSkill.value = ''
        } else if (name === 'require') {
          if (reqName) {
            let req = { reqName: reqName.value }
            getVacancy.value.requirements.push(req)
          }
          reqName.value = ''

        } else if (name === 'dependency') {
          if (depName) {
            let dep = { depName: depName.value }
            getVacancy.value.dependencies.push(dep)
          }
          depName.value = ''
        } else {
          if (conName) {
            let con = { conName: conName.value }
            getVacancy.value.conditions.push(con)
          }
          conName.value = ''
        }
      }

      const deleteElement = (name:any, index:number) => {
        if (name === 'skills') {
          getVacancy.value.skills.splice(index, 1)
        } else if (name === "require") {
          getVacancy.value.requirements.splice(index, 1)
        } else if (name === 'dependency') {
          getVacancy.value.dependencies.splice(index, 1)
        } else {
          getVacancy.value.conditions.splice(index, 1)
        }
      }

      const handleSubmit = () => {
        submitted.value = true
        if (!getVacancy.value.city && getVacancy.value.skills 
            && getVacancy.value.requirements && getVacancy.value.dependencies
              && getVacancy.value.conditions) {
          
                showMessage('error', 'Error Message', 'Fill in all the fields !', 3000)
                return
        }

        updateVacancy()
      }

      function updateVacancy() {
        const vacancy = {
          id: getVacancy.value.id,
          username: currentUser.value,
          companyName: getVacancy.value.companyName,
          jobName: getVacancy.value.jobName,
          city: getVacancy.value.city,
          basicSkills: getVacancy.value.skills,
          requirements: getVacancy.value.requirements,
          dependencies: getVacancy.value.dependencies,
          conditions: getVacancy.value.conditions,
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
        getVacancy,
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