import { IResponseItem } from "@/interfaces/vacancyInterface/IResponseItem"
import VacancyService from "@/services/vacancyService"
import { defineStore } from "pinia"
import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

export const vacancyModuleStore = defineStore('vacancy', {
  state: () => {
    return {
      data: [] as [] | IResponseItem[] as unknown | any,
      loaderIsActive: true as boolean,
      apiDeliveredStatus: '',
      companyVacancy: {} as any,
      userVacancyList: [] as [] | IResponseItem[] as unknown | any,
      vacancy: {} as any,
    }
  },
  actions: {
    changeLoaderActive(mode: boolean) {
      this.$state.loaderIsActive = mode
    },
    async getDataFromApi() {
      try {
        this.changeLoaderActive(true)
        const response = await axios.get(API_URL + '/vacancy/allVacancy', { withCredentials: true })

        if (Array.isArray(response.data)) {
          const newObject = response.data.map((item: IResponseItem) => {
            let obj = {}
            obj = {
              id: item.id,
              username: item.username,
              companyName: item.companyName,
              jobName: item.jobName,
              city: item.city,
              skills: item.basicSkills,
              requirements: item.requirements,
              dependencies: item.dependencies,
              conditions: item.conditions,
            }

            return obj
          })

          this.$state.data  = newObject
          this.$state.apiDeliveredStatus = 'success'
          setTimeout(() => {
            this.changeLoaderActive(false)
          }, 1500);
        } else {
          this.$state.data  = null
          this.changeLoaderActive(false)
        }
      } catch(error) {
        this.apiDeliveredStatus = 'error'
        this.changeLoaderActive(false)
      }
    },
    async getDataWithID(id: Number) {
      try {
        this.changeLoaderActive(true)
        const response = await axios.get(API_URL + `/vacancy/${id}`, { withCredentials: true })

        const newObject =
        {
          id: response.data.id,
          username: response.data.username,
          companyName: response.data.companyName,
          jobName: response.data.jobName,
          city: response.data.city,
          skills: response.data.basicSkills,
          requirements: response.data.requirements,
          dependencies: response.data.dependencies,
          conditions: response.data.conditions,
        }
        this.$state.vacancy  = newObject
        console.log(newObject)
        this.$state.apiDeliveredStatus = 'success'
        setTimeout(() => {
          this.changeLoaderActive(false)
        }, 1500)
      } catch(error) {
        this.apiDeliveredStatus = 'error'
      }
    },
    async getCompanyVacancy(company: string | undefined) {
      try {
        this.changeLoaderActive(true)
        const response = await axios.get(API_URL + `/vacancy/companyVacancy/${company}`, { withCredentials: true })

        if (Array.isArray(response.data)) {
          const newObject = response.data.map((item: IResponseItem) => {
            let obj = {}
            obj = {
              id: item.id,
              username: item.username,
              companyName: item.companyName,
              jobName: item.jobName,
              city: item.city,
              skills: item.basicSkills,
              requirements: item.requirements,
              dependencies: item.dependencies,
              conditions: item.conditions,
            }

            return obj
          })

          this.$state.data  = newObject
          this.$state.apiDeliveredStatus = 'success'
          setTimeout(() => {
            this.changeLoaderActive(false)
          }, 1500)
        }
      } catch(error) {
        this.apiDeliveredStatus = 'error'
        setTimeout(() => {
          this.changeLoaderActive(false)
        }, 1500);
      }
    },
    deleteVacancy(id: number) {
      return VacancyService.deleteVacancy(id)
    },
    createVacancy(vacancy: {
      username: string,
      companyName: string,
      jobName: string,
      city: string,
      basicSkills: [],
      requirements: [],
      dependencies: [],
      conditions: [],
    }) {
      return VacancyService.createVacancy(vacancy)
        .then(vacancy => {
          return Promise.resolve(vacancy)
        },
        error => {
          return Promise.reject(error)
        },
      )
    }
  }
})