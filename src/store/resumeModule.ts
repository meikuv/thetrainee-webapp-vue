import { IResumeItem } from '@/interfaces/resumeInterface/IResumeItem'
import { defineStore } from 'pinia'
import ResumeService from '@/services/resumeService'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const resumeModuleStore = defineStore('resume', {
  state: () => {
    return {
      userResumes: [] as [] | IResumeItem[] as unknown | any,
      resume: {} as any | IResumeItem as any,
      loaderIsActive: true as boolean,
      apiDeliveredStatus: '',
    }
  },
  actions: {
    changeLoaderActive(mode: boolean) {
      this.$state.loaderIsActive = mode
    },
    async getUserResumes(username: string | undefined) {
      try {
        this.changeLoaderActive(true)
        const response = await axios.get(API_URL + `/resume/userResume/${username}`, { withCredentials: true })

        if (Array.isArray(response.data)) {
          const newObject = response.data.map((item: IResumeItem) => {
            let obj = {}
            obj = {
              id: item.id,
              username: item.username,
              position: item.position,
              salary: item.salary,
              salaryMode: item.salaryMode,
              coreSkills: item.coreSkills,
            }

            return obj
          })

          this.$state.userResumes  = newObject
          this.$state.apiDeliveredStatus = 'success'
          setTimeout(() => {
            this.changeLoaderActive(false)
          }, 1500);
        } else {
          this.$state.userResumes  = null
          this.changeLoaderActive(false)
        }
      } catch(error) {
        this.apiDeliveredStatus = 'error'
        this.changeLoaderActive(false)
      }
    },
    async getResumeWithId(id: number) {
      try {
        this.changeLoaderActive(true)
        const response = await axios.get<IResumeItem>(API_URL + `/resume/${id}`, { withCredentials: true })

        const newObject = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phone: response.data.phone,
          city: response.data.city,
          gender: response.data.gender,
          birthDate: response.data.birthDate,
          position: response.data.position,
          salary: response.data.salary,
          salaryMode: response.data.salaryMode,
          aboutMe: response.data.aboutMe,
          coreSkills: response.data.coreSkills,
          workExps: response.data.workExperiences,
          studyPlace: response.data.studyPlaces,
          languages: response.data.languages,          
        }
        
        this.resume = newObject
        this.apiDeliveredStatus = 'success'
        setTimeout(() => {
          this.changeLoaderActive(false)
        }, 1500)
      } catch (error) {
        this.apiDeliveredStatus = 'error'
      }
    },
    createResume(resume: {
      username: string,
      firstName: string,
      lastName: string,
      phone: string,
      city: string,
      gender: string,
      birthDate: string,
      position: string,
      salary: string,
      salaryMode: string,
      aboutMe: string,
      coreSkills: any,
      workExperiences: any,
      studyPlaces: any,
      languages: any,
    }) {
      return ResumeService.createResume(resume)
        .then(resume => {
          return Promise.resolve(resume)
        },
        error => {
          return Promise.reject(error)
        },
      )
    },
    deleteResume(id: number) {
      return ResumeService.deleteResume(id)
    },
  }
})