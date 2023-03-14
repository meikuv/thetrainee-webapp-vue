import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class AuthService {

  register(user: { username: string, email: string, password: string }): Promise<void> {
    return axios
      .post(API_URL + '/auth/signup', {
        username: user.username,
        email: user.email,
        password: user.password,
      }, {withCredentials: true})
      .then(response => {
        return response.data
      })
  }

  login(user: Record<string, string>): Promise<string> {
    return axios
      .post(API_URL + '/auth/signin', {
        username: user.username,
        password: user.password,
      }, {withCredentials: true})
      .then(response => {
        if (response.data.accessToken) {
          sessionStorage.setItem('user', JSON.stringify(response.data))
          sessionStorage.setItem('role', JSON.stringify(response.data.roles))
          sessionStorage.setItem('currentUser', user.username)
        }
        return response.data
      })
  }

  logout(): Promise<string> {
    return axios
      .post(API_URL + '/auth/logout', { withCredentials: true })
      .then(response => {
        if (response.data.message) {
          sessionStorage.clear()
          location.reload()
        }
        return response.data
      },
      error => {
        sessionStorage.clear()
        location.reload()
      })
  }
}
export default new AuthService()