import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

class ProfileService {
  
  userInfoUpdate(userInfo: {
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
    return axios.post(API_URL + '/userInfo/update', {
      username: userInfo.username,
      email: userInfo.email,
      lastName: userInfo.lastName,
      firstName: userInfo.firstName,
      companyName: userInfo.companyName,
      userGithub: userInfo.userGithub,
      userInstagram: userInfo.userInstagram,
      userTelegram: userInfo.userTelegram,
      userLinkedIn: userInfo.userLinkedIn,
      phone: userInfo.phone,
      about: userInfo.about,
    }, { withCredentials: true })
    .then(response => {
      return response.data
    })
  }
}

export default new ProfileService()