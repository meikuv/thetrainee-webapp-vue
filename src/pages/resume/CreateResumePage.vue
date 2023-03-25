<template>
  <Toast :baseZIndex="100000001"/>
  <Card style="width: 60em; margin-left: 50px; padding: 0px 24px 0 24px;">
    <template #header>
      <div class="resume__header">
        <h4 class="resume__header-text">Create Resume</h4>
      </div>
    </template>
    <template #title>
      <Divider />
    </template>
    <template #content>
      <div class="resume__content">
        <form @submit.prevent="handleSubmit(!v$.$invalid)">
          <div class="p-fluid">
            <h3>Contact details</h3>
            <div class="block-column">
              <label for="firstname" class="block-label" :class="{'p-error': v$.firstName.$invalid && submitted }">First Name</label>
              <InputText id="firsname" 
                class="inputs_first" 
                v-model="v$.firstName.$model"  
                :class="{'p-invalid': v$.firstName.$invalid && submitted}"
              />
            </div>
            <div class="block-column">
              <label for="lastname" class="block-label" :class="{'p-error': v$.lastName.$invalid && submitted }">Last Name</label>
              <InputText id="lastname" 
                class="inputs_first" 
                v-model="v$.lastName.$model"  
                :class="{'p-invalid': v$.lastName.$invalid && submitted}"
              />
            </div>
            <div class="block-column">
              <label for="phone" class="block-label" :class="{'p-error': v$.phone.$invalid && submitted }">Phone</label>
              <InputMask id="phone" 
                class="inputs_first" 
                mask="(999) 999-9999" 
                v-model="v$.phone.$model"  
                :class="{'p-invalid': v$.phone.$invalid && submitted}" 
                placeholder="(999) 999-9999" 
              />
            </div>
            <div class="block-column">
              <label for="city-name" class="block-label" :class="{'p-error': v$.city.$invalid && submitted}">City</label>
              <InputText 
                id="city-name" 
                class="inputs_first"
                v-model="v$.city.$model"
                :class="{'p-invalid': v$.city.$invalid && submitted}"
                placeholder="Almaty"
              />
            </div>
            <h3>Basic information</h3>
            <div class="block-column">
              <label for="birth-date" class="block-label" :class="{'p-error': v$.birthDate.$invalid && submitted}">Birth date</label>
              <Calendar 
                id="birth-date"
                class="inputs_first"
                v-model="v$.birthDate.$model"
                :class="{'p-invalid': v$.birthDate.$invalid && submitted}"
                showButtonBar
                dateFormat="dd/mm/yy"
                showIcon
              />
            </div>
            <div class="block-column">
              <label for="gender-name" class="block-label" :class="{'p-error': v$.gender.$invalid && submitted}">Gender</label>
              <Dropdown 
                id="gender-name" 
                class="inputs_first"
                v-model="v$.gender.$model"
                :class="{'p-invalid': v$.gender.$invalid && submitted}"
                :options="selectGender" 
                optionLabel="name" 
                optionValue="code" 
                placeholder="Select a gender"
              />
            </div>
            <h3>Specialization</h3>
            <div class="block-column">
              <label for="position-name" class="block-label" :class="{'p-error': v$.position.$invalid && submitted}">Desired position</label>
              <InputText 
                id="position-name" 
                class="inputs_first"
                v-model="v$.position.$model"
                :class="{'p-invalid': v$.position.$invalid && submitted}"
              />
            </div>
            <div class="block-column">
              <label for="salary" class="block-label" :class="{'p-error': v$.salary.$invalid && submitted}">Salary</label>
              <InputText 
                id="salary"
                class="input_third"
                type="number"
                oninput="this.value = Math.round(this.value);"
                step="10000"
                v-model="v$.salary.$model"
                :class="{'p-invalid': v$.salary.$invalid && submitted}"
              />
              <Dropdown 
                id="salaryMode" 
                v-model="v$.salaryMode.$model"
                style="margin-left: 10px;"
                :class="{'p-invalid': v$.salaryMode.$invalid && submitted}"
                :options="salaryModes" 
                optionLabel="name" 
                optionValue="code" 
              />
            </div>
            <h3>Work experience</h3>
            <div class="block-column">
              <label for="work-exp" class="block-label">Places of work</label>
              <Button
                id="work-exp"
                class="btn_list" 
                label="Add a place of work"
                @click="openModal()"
              />
            </div>
            <div class="work-exp_wrapper">
              <div class="work-exp_elements" v-for="(work, index) in v$.workExps.$model" :key="index">
                <div class="work-exp_element">
                  <p style="color: #1785e5;">
                    {{ work.startDate }}
                    <span v-if="!work.endDate"> - until now</span>
                    <span v-else> - {{ work.endDate }} </span>
                  </p>
                  <b>{{ work.organization }}</b> 
                  {{ work.position }} 
                </div>
                <i class="pi pi-trash" style="font-size: 12px; margin: 5px 5px;" @click="deleteElement('workExp', index)"></i>
              </div>
            </div>
            <div class="block-column">
              <label for="about" class="block-label" :class="{'p-error': v$.aboutMe.$invalid && submitted}">About me</label>
              <Textarea 
                id="about"
                style="margin-left: 40px; width: 400px; font-size: 12px;"
                v-model="v$.aboutMe.$model"
                :class="{'p-invalid': v$.aboutMe.$invalid && submitted}"
                autoResize rows="5" cols="30"
                placeholder="Tell us about your qualities, knowledge, hobbies that, in your opinion, will be useful to the employer"
              />
            </div>
            <div class="block-column">
              <label for="skill-name" class="block-label" :class="{'p-error': v$.keySkills.$invalid && submitted}">Core Skills</label>
              <form class="form_list" @submit.prevent="addNew('skills')">
                <InputText 
                  id="skill-name" 
                  class="inputs_second input_list"
                  :class="{'p-invalid': v$.keySkills.$invalid && submitted}"
                  placeholder="Start typing here"
                  v-model="skill"
                />
                <Button class="btn_form" label="Add skill" type="submit"/>
              </form>
            </div>
            <div class="skill_wrapper">
              <span class="skill-badge" v-for="(skill, index) in v$.keySkills.$model" :key="index">
                {{ skill.skill }} 
                <i class="pi pi-trash" style="font-size: 10px; margin-left: 2px;" @click="deleteElement('skills', index)"></i>
              </span>
            </div>
            <h3>Education</h3>
            <div class="block-column">
              <label for="stydy-place" class="block-label" :class="{'p-error': v$.studyPlaces.$invalid && submitted}">Place of study</label>
              <Button
                id="work-exp"
                class="btn_list" 
                label="Add a place of study"
                :class="{'p-invalid': v$.studyPlaces.$invalid && submitted}"
                @click="openStudyModal()"
              />
            </div>
            <div class="study_wrapper">
              <div class="study_elements" v-for="(study, index) in v$.studyPlaces.$model" :key="index">
                <div class="study_element">
                  <div class="institute">
                    <label for="institute-label">Institute: </label>
                    <span>{{ study.institution }}</span>
                  </div>
                  <div class="institute">
                    <label for="institute-label">Faculty: </label>
                    <span>{{ study.faculty }}</span>
                  </div>
                  <div class="institute">
                    <label for="institute-label">Specialization: </label>
                    <span>{{ study.specialization }}</span>
                  </div>
                  <div class="institute">
                    <label for="institute-label">Year of graduation: </label>
                    <span>{{ study.gradYear }}</span>
                  </div>
                </div>
                <i class="pi pi-trash" style="font-size: 12px; margin: 5px 5px;" @click="deleteElement('studyPlace', index)"></i>
              </div>
            </div>
            <div class="block-column">
              <label for="language" class="block-label" :class="{'p-error': v$.languages.$invalid && submitted}">Languages</label>
              <form class="form_list" @submit.prevent="addNew('language')">
                <InputText 
                  id="language" 
                  class="inputs_second input_list"
                  :class="{'p-invalid': v$.languages.$invalid && submitted}"
                  placeholder="For example: English - Elementary"
                  v-model="language"
                />
                <Button class="btn_form" label="Add language" type="submit"/>
              </form>
            </div>
            <div class="skill_wrapper">
              <span class="skill-badge" v-for="(language, index) in v$.languages.$model" :key="index">
                {{ language.language }} 
                <i class="pi pi-trash" style="font-size: 10px; margin-left: 2px;" @click="deleteElement('language', index)"></i>
              </span>
            </div>
          </div>
          <Button type="submit" class="btn_submit" label="Create and Publish" />
        </form>
      </div>
    </template>
  </Card>
  <Dialog header="Work experience" v-model:visible="displayModal" :style="{ width: '30vw'}" :modal="true">
    <form @submit.prevent="handleWorkSubmit(!s$.$invalid)" ref="workForm">
      <div class="p-fluid">
        <div class="field">
          <label for="start-date" :class="{'p-error': s$.startDate.$invalid && submitWorkModal }">Start date of work</label>
          <Calendar 
            id="start-date"
            class="inputs_fifth"
            v-model="s$.startDate.$model"
            :class="{'p-invalid': s$.startDate.$invalid && submitWorkModal}"
            showButtonBar
            view="month" dateFormat="mm/yy"
            showIcon
          />
        </div>
        <div class="field">
          <label for="end-date">End date of work</label>
          <Calendar 
            id="end-date"
            class="inputs_fifth"
            v-model="s$.endDate.$model"
            showButtonBar
            view="month" dateFormat="mm/yy"
            showIcon
          />
        </div>
        <div class="field">
          <label for="organization" :class="{'p-error': s$.organization.$invalid && submitWorkModal }">Organization</label>
          <InputText 
            id="organization" 
            class="inputs_fourth"
            :class="{'p-invalid': s$.organization.$invalid && submitWorkModal}"
            v-model="s$.organization.$model"
          />
        </div>
        <div class="field">
          <label for="position" :class="{'p-error': s$.position.$invalid && submitWorkModal }">Position</label>
          <InputText 
            id="position" 
            class="inputs_fourth"
            v-model="s$.position.$model"
            :class="{'p-invalid': s$.position.$invalid && submitWorkModal}"
          />
        </div>
        <div class="field">
          <label for="aboutWork">About work</label>
          <Textarea 
            id="aboutWork"
            style=" width: 20em;"
            v-model="s$.aboutWork.$model"
            autoResize rows="5" cols="30"
            placeholder="Describe what you did at work."
          />
        </div>
      </div>
      <Button type="submit" class="btn_submit" label="Add" />
    </form>
  </Dialog>
  <Dialog header="Education" v-model:visible="displayStudyModal" :style="{ width: '30vw'}" :modal="true">
    <form @submit.prevent="handleStudySubmit(!k$.$invalid)">
      <div class="fluid">
        <div class="field">
          <label for="institution" :class="{'p-error': k$.institution.$invalid && submitStudyModal}">Education institution</label>
          <InputText 
            id="institution" 
            class="inputs_fourth"
            v-model="k$.institution.$model"
            :class="{'p-invalid': k$.institution.$invalid && submitStudyModal}"
          />
        </div>
        <div class="field">
          <label for="faculty" :class="{'p-error': k$.faculty.$invalid && submitStudyModal }">Faculty</label>
          <InputText 
            id="faculty" 
            class="inputs_fourth"
            v-model="k$.faculty.$model"
            :class="{'p-invalid': k$.faculty.$invalid && submitStudyModal}"
          />
        </div>
        <div class="field">
          <label for="specialization" :class="{'p-error': k$.specialization.$invalid && submitStudyModal }">Specialization</label>
          <InputText 
            id="specialization" 
            class="inputs_fourth"
            v-model="k$.specialization.$model"
            :class="{'p-invalid': k$.specialization.$invalid && submitStudyModal}"
          />
        </div>
        <div class="field">
          <label for="gradYear" :class="{'p-error': k$.gradYear.$invalid && submitStudyModal }">Year of graduation</label>
          <InputText 
            id="gradYear" 
            type="number"
            oninput="this.value = Math.round(this.value);"
            style="width: 10em;"
            v-model="k$.gradYear.$model"
            :class="{'p-invalid': k$.gradYear.$invalid && submitStudyModal}"
          />
        </div>
      </div>
      <Button type="submit" class="btn_submit" label="Add" />
    </form>
  </Dialog>
</template>

<script lang="ts">
  import { defineComponent, computed, reactive, ref } from 'vue'
  import { authModuleStore } from '@/store/authModule'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { useRouter } from 'vue-router'
  import { useToast } from 'primevue/usetoast'
  import { required } from '@vuelidate/validators'
  import { useVuelidate } from '@vuelidate/core'
  import RadioButton from 'primevue/radiobutton'
  import InputText from 'primevue/inputtext'
  import InputMask from 'primevue/inputmask'
  import Calendar from 'primevue/calendar'
  import Dropdown from 'primevue/dropdown'
  import Textarea from 'primevue/textarea'
  import Divider from 'primevue/divider'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import Toast from 'primevue/toast'
  import Card from 'primevue/card'

  export default defineComponent({
    components: {
      RadioButton,
      InputText,
      InputMask,
      Calendar,
      Dropdown,
      Textarea,
      Divider,
      Dialog,
      Button,
      Toast,
      Card,
    },
    setup() {
      const toast = useToast()
      const router = useRouter()
      const authUserStore = authModuleStore()
      const resumeStore = resumeModuleStore()
      const currentUser = computed(() => authUserStore.getCurrentUser)
      const skill = ref('')
      const language = ref('')
      const displayModal = ref(false)
      const displayStudyModal = ref(false)
      const errorMessage = ref('')
      const selectGender = ref([
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
      ])
      const salaryModes = ref([
        { name: 'KZT', code: 'KZT' },
        { name: 'USD', code: 'USD' },
        { name: 'EUR', code: 'EUR' },
      ])

      const state = reactive({
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        gender: '',
        birthDate: '',
        position: 'Novice specialist',
        salary: null,
        salaryMode: 'KZT',
        aboutMe: '',
        keySkills: [] as any,
        languages: [] as any,
        workExps: [] as any,
        studyPlaces: [] as any,
      })

      const rules = {
        firstName: { required },
        lastName: { required },
        phone: { required },
        city: { required },
        gender: { required },
        birthDate: { required },
        position: { required },
        salaryMode: '',
        salary: '',
        aboutMe: { required },  
        keySkills: { required },
        languages: { required },
        workExps: [] as any,
        studyPlaces: { required },
      }

      const stateWork = reactive({
        startDate: '',
        endDate: '',
        organization: '',
        position: '',
        aboutWork: '',
      })

      const rulesWork = {
        startDate: { required },
        endDate: '',
        organization: { required },
        position: { required },
        aboutWork: '',
      }

      const stateStudy = reactive({
        institution: '',
        faculty: '',
        specialization: '',
        gradYear: '',
      })

      const rulesStudy = {
        institution: { required },
        faculty: { required },
        specialization: { required },
        gradYear: { required },
      }

      const resetForm = () => {
          state.firstName = ''
          state.birthDate = ''
          state.city = ''
          state.lastName = ''
          state.gender = ''
          state.position = ''
          state.phone = ''
          state.aboutMe = ''
          state.salary = null
          state.keySkills = []
          state.languages = []
          state.studyPlaces = []
          state.workExps = []
          submitted.value = false
      }

      const resetWorkForm = () => {
        stateWork.startDate = ''
        stateWork.endDate = ''
        stateWork.organization =  ''
        stateWork.position = ''
        stateWork.aboutWork = ''
        submitWorkModal.value = false
      }

      const resetStudyForm = () => {
        stateStudy.institution = ''
        stateStudy.specialization = ''
        stateStudy.faculty =  ''
        stateStudy.gradYear = ''
        submitStudyModal.value = false
      }

      const submitted = ref(false)
      const submitStudyModal = ref(false)
      const submitWorkModal = ref(false);

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
          if (skill.value !== '') {
            let bskill = { skill: skill.value }
            state.keySkills.push(bskill)
          }
          skill.value = ''
        } else if (name === 'language') {
          if (language.value !== '') {
            let lang = { language: language.value }
            state.languages.push(lang)
          }
          language.value = ''
        }
      }

      const deleteElement = (name:any, index:number) => {
        if (name === 'skills') {
          state.keySkills.splice(index, 1)
        } else if (name === 'language') {
          state.languages.splice(index, 1)
        } else if (name === 'workExp') {
          state.workExps.splice(index, 1)
        } else if (name === 'studyPlace') {
          state.studyPlaces.splice(index, 1)
        }
      }

      const openModal = () => {
        displayModal.value = true;
      };

      const openStudyModal = () => {
        displayStudyModal.value = true;
      };

      const handleSubmit = (isFormValid: boolean) => {
        submitted.value = true
        if (!isFormValid) {
          showMessage('error', 'Error Message', 'Fill in the required fields1', 3000)
          return
        }

        createResume()
      }

      const handleWorkSubmit = (isFormValid: boolean) => {
        submitWorkModal.value = true
        if (!isFormValid) {
          showMessage('error', 'Error Message', 'Fill in the required fields2', 3000)
          return
        }
        let workExp = { 
          startDate: `${stateWork.startDate.toLocaleString('en-US', { month: 'short' })}/${stateWork.startDate.getFullYear()}`,
          endDate: stateWork.endDate ? `${stateWork.endDate.toLocaleString('en-US', { month: 'short' })}/${stateWork.endDate.getFullYear()}` : '',
          organization: stateWork.organization,
          position: stateWork.position,
          aboutWork: stateWork.aboutWork,
        }

        state.workExps.push(workExp)

        displayModal.value = false;
        resetWorkForm()
      }

      const handleStudySubmit = (isFormValid: boolean) => {
        submitStudyModal.value = true
        if (!isFormValid) {
          showMessage('error', 'Error Message', 'Fill in the required fields3', 3000)
          return
        }
        let studyPlace = {
          institution: stateStudy.institution,
          specialization: stateStudy.specialization,
          faculty: stateStudy.faculty,
          gradYear: stateStudy.gradYear
        }

        state.studyPlaces.push(studyPlace)

        displayStudyModal.value = false;
        resetStudyForm()
      }

      function createResume() {
        const resume = {
          username: currentUser.value,
          firstName: state.firstName,
          lastName: state.lastName,
          phone: state.phone,
          city: state.city,
          gender: state.gender,
          birthDate: state.birthDate.toLocaleDateString('pt-PT'),
          position: state.position,
          salary: state.salary === 0 ? null : state.salary,
          salaryMode: state.salaryMode,
          aboutMe: state.aboutMe,
          coreSkills: state.keySkills,
          workExperiences: state.workExps,
          studyPlaces: state.studyPlaces,
          languages: state.languages,
        } as any
        resumeStore.createResume(resume).then(
          () => {
            showMessage('success', 'Success Message', 'Created successfully !', 3000)
            setTimeout(() => {
              router.push({
                name: 'myResumes'
              })
            }, 600);
          },
          error => {
            errorMessage.value =
              (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
            showMessage('error', 'Error Message', errorMessage.value, 3000)
          },
        )
      }

      const v$ = useVuelidate(rules, state) as any
      const s$ = useVuelidate(rulesWork, stateWork) as any
      const k$ = useVuelidate(rulesStudy, stateStudy) as any

      return {
        displayStudyModal,
        handleStudySubmit,
        handleWorkSubmit,
        submitStudyModal,
        submitWorkModal,
        openStudyModal,
        deleteElement,
        displayModal,
        handleSubmit,
        selectGender,
        salaryModes,
        openModal,
        submitted,
        language,
        addNew,
        skill,
        v$,
        s$,
        k$,
      }
    }
  })
</script>

<style lang="scss" src="./createResumePage.scss" scoped></style>