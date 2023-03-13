import { defineStore } from 'pinia'
import AuthService from '@/services/authService'

export const authModuleStore = defineStore('authModule', {
  state: () => {
    return {
      loggedIn: false as boolean,
      user: {} as string | unknown,
      currentUser: '' as string,
      role: '' as string,
      success: false as boolean,
    }
  },
  getters: {
    isLoggedIn(state): boolean {
      return !!state.loggedIn
    },
    isSuccess(state): boolean {
      return state.success
    },
    getCurrentUser(state): string | undefined {
      if (sessionStorage.getItem('currentUser') !== '') {
        this.loggedIn = true
        this.user = JSON.parse(<string>sessionStorage.getItem('user'))
        this.currentUser = <string>sessionStorage.getItem('currentUser')
      }
      return state.currentUser
    },
    getUserRole(state): any {
      if (sessionStorage.getItem('role') !== '') {
        this.role = <string>sessionStorage.getItem('role')
      }
      return state.role
    }
  },
  actions: {
    register(user: { username: string, email: string, password: string }) {
      return AuthService.register(user)
        .then(user => { 
          this.registerSuccess()
          return Promise.resolve(user)
        },
        error => {
          this.registerFailure()
          return Promise.reject(error)
        }
      )
    },
    login(user: Record<string, string>) {
      return AuthService.login(user)
        .then(user => {
          this.loginSucces()
          return Promise.resolve(user)
        },
        error => {
          this.loginFailure()
          return Promise.reject(error)
        },
      )
    },
    logout(): void {
      AuthService.logout()
      this.loggedIn = false
      this.user = {}
    },
    registerSuccess(): void {
      this.success = true
    },
    registerFailure(): void {
      this.success = false
    },
    loginSucces(): void {
      this.loggedIn = true
      this.user = JSON.parse(<string>sessionStorage.getItem('user'))
      this.currentUser = <string>sessionStorage.getItem('currentUser')
    },
    loginFailure(): void {
      this.loggedIn = false
      this.user = {}
    }
  }
})