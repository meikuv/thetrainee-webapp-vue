<template>
  <div v-if="resumeStore.loaderIsActive" class="spinner-centred">
    <Spinner />
  </div>
  <div class="resume-wrapper">
    <div v-if="!resumeStore.loaderIsActive && resumeStore.resume" class="resume-content">
      <article class="single-resume" id="resume-document">
        <div class="single__header">
          <div class="single__header-left-content">
            <h3 itemprop="headline">{{ resumeStore.resume.lastName }} {{ resumeStore.resume.firstName }}</h3>
            <p class="single__header-personal">
              <span class="resume-personal">{{ resumeStore.resume.gender }}</span>
              <span>, was born </span>
              <span class="resume-personal"> {{ resumeStore.resume.birthDate }}</span>
            </p>
            <div class="single__header-contact">
              <p class="contact-text">Contacts</p>
              <span>+7{{ resumeStore.resume.phone }}</span>
              <br />
              <span class="resume-personal">{{ profileInfo.email }}</span>
            </div>
          </div>
          <div class="single__header-left-content">
            <Avatar v-if="resumeStore.resume.gender === 'Male'" 
              image="http://localhost:5173/src/assets/man-avatar-icon-free-vector.webp" 
              style="width: 150px; height: 150px;"
            />
            <Avatar v-if="resumeStore.resume.gender === 'Female'" 
              image="http://localhost:5173/src/assets/womanava.jpg" 
              style="width: 150px; height: 150px;"
            />
          </div>
        </div>
        <div class="single__content">
          <Divider />
          <div class="single__content-left">
            <h4 style="margin-bottom: 5px;">{{ resumeStore.resume.position }}</h4>
            <span class="salary">{{ resumeStore.resume.salary }} {{ resumeStore.resume.salaryMode }}</span>
          </div>
          <div class="work-exp">
            <h5 class="text-gray">Work experience</h5>
            <div class="work-study-element" v-for="(work, index) in resumeStore.resume.workExps" :key="index">
              <div class="element-left">
                {{ work.startDate }}
                <span v-if="!work.endDate"> -- until now</span>
                <span v-else> -- {{ work.endDate }} </span>
              </div>
              <div class="element-right">
                <b style="font-size: 13px;">{{ work.organization }}</b>
                <br />
                <b style="font-size: 13px;">{{ work.position }}</b>
                <p style="font-size: 13px;">{{ work.aboutWork }}</p>
              </div>
            </div>
          </div>
          <div class="resume-skill">
            <h5 class="text-gray">Core skills</h5>
            <div class="resume-skill-elements" >
              <div class="resume-skill-lang-element" v-for="(skill, index) in resumeStore.resume.coreSkills" :key="index">
                {{ skill.skill }}
              </div>
            </div>
          </div>
          <div class="resume-aboutMe">
            <h5 class="text-gray">About me</h5>
            <p style="font-size: 13px;">{{ resumeStore.resume.aboutMe }}</p>
          </div>
          <div class="resume-study">
            <h5 class="text-gray">Education</h5>
            <div class="work-study-element" v-for="(study, index) in resumeStore.resume.studyPlaces" :key="index" >
              <div class="element-left">
                {{ study.gradYear }}
              </div>
              <div class="element-right">
                <b style="font-size: 13px;">{{ study.institution }}</b>
                <br />
                <p style="font-size: 13px;">{{ study.faculty }}, specialization: {{ study.specialization }}</p>
              </div>
            </div>
          </div>
          <div class="resume-language">
            <h5 class="text-gray">Knowledge of languages</h5>
            <div>
              <div class="resume-skill-lang-element" v-for="(lang, index) in resumeStore.resume.languages" :key="index">
                {{ lang.language }}
              </div>
            </div>
          </div>
        </div>
      </article>
      <div class="resume-actions">
        <i class="pi pi-download action-btn" @click="exportToPDF()"></i>
        <Divider layout="vertical"/>
        <i class="pi pi-pencil action-btn"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, computed, ref } from 'vue'
  import { resumeModuleStore } from '@/store/resumeModule'
  import { authModuleStore } from '@/store/authModule'
  import { profileModuleStore } from '@/store/profileModule'
  import Spinner from '@/components/spinner/Spinner.vue'
  import Divider from 'primevue/divider'
  import Button from 'primevue/button'
  import Avatar from 'primevue/avatar'

  export default defineComponent({
    components: {
      Divider,
      Spinner,
      Button,
      Avatar,
    },
    props: {
      id: {
        type: Number,
        required: true,
      },
    },
    setup(props: any) {
      const resumeStore = resumeModuleStore()
      const authUserStore = authModuleStore()
      const profileStore = profileModuleStore()
      const profileInfo = computed(() => profileStore.getProfileInfo)
      const currentUser = computed(() => authUserStore.getCurrentUser)

      function exportToPDF () {
        const { jsPDF } = window.jspdf 

        var doc = new jsPDF('l', 'mm', 'a4');
        var pdfjs = document.getElementById('resume-document');

        doc.html(pdfjs, {
          callback: function(doc: any) {
            doc.save("newpdf.pdf");
          },
          // x: 12,
          // y: 12
        });   
			}

      onMounted(async () => {
        await resumeStore.getResumeWithId(props.id)
        await profileStore.getUserInfo(currentUser.value)
      })
      return {
        exportToPDF,
        resumeStore,
        profileInfo,
        document,
      }
    }
  })
</script>

<style lang="scss" src="./resumePage.scss" scoped></style>