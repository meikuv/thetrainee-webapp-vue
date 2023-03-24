import { defineStore } from "pinia"
import ProfileService from '@/services/profileService'
import axios from "axios"

export const profileModuleStore = defineStore('profileModule', {
  state: () => {
    return {
      loaderIsActive: true as boolean,
      apiDeliveredStatus: '',
      profileInfo: {} as any,
      storageInfo: {} as any,
    }
  },
  getters: {
    getProfileInfo(state) {
      return state.profileInfo
    },
    getStorageInfo(state) {
      if (sessionStorage.getItem('profileInfo') !== '') {
        this.storageInfo = JSON.parse(<string>sessionStorage.getItem('profileInfo'))
      }
      return state.storageInfo
    }
  },
  actions: {
    changeLoaderActive(mode: boolean) {
      this.$state.loaderIsActive = mode
    },
    userProfileUpdate(userInfo: {
      username: string,
      email: string,
      lastName: string,
      firstName: string,
      companyName: string,
      userGithub: string,
      userInstagram: string,
      userTelegram: string,
      userLinkedIn: string,
      phone: string,
      about: string,
    }) {
      return ProfileService.userInfoUpdate(userInfo)
        .then(userInfo => {
          return Promise.resolve(userInfo)
        }, 
        error => {
          return Promise.reject(error)
        },
      )
    },
    async getUserInfo(username: any) {
      try {
        this.changeLoaderActive(true)
        
        const response = await axios
          .get(import.meta.env.VITE_API_URL + `/userInfo/${username}`, { withCredentials: true })
        
        const newObject = {
          username: response.data.username,
          email: response.data.email,
          lastName: response.data.lastName,
          firstName: response.data.firstName,
          companyName: response.data.companyName,
          userGithub: response.data.userGithub,
          userInstagram: response.data.userInstagram,
          userTelegram: response.data.userTelegram,
          userLinkedIn: response.data.userLinkedIn,
          phone: response.data.phone,
          about: response.data.about,
        }

        this.profileInfo = newObject
        sessionStorage.setItem('profileInfo', JSON.stringify(newObject))
        this.apiDeliveredStatus = 'success'
        setTimeout(() => {
          this.changeLoaderActive(false)
        }, 1500);

        return this.profileInfo
      } catch (error) {
        this.apiDeliveredStatus = 'error'
      }
    }
  },
})