import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

class VacancyService {

  createVacancy(vacancy: {
    username: string,
    companyName: string,
    jobName: string,
    city: string,
    basicSkills: any,
    requirements: any,
    dependencies: any,
    conditions: any,
  }) {
    return axios.post(API_URL + `/vacancy/createVacancy/${vacancy.username}`, {
      vacancy: {
        username: vacancy.username,
        companyName: vacancy.companyName,
        jobName: vacancy.jobName,
        city: vacancy.city,
        basicSkills: vacancy.basicSkills,
        requirements: vacancy.requirements,
        dependencies: vacancy.dependencies,
        conditions: vacancy.conditions,
      }
    }, { withCredentials: true })
    .then(response => {
      return response.data
    })
  }

  deleteVacancy(id: number) {
    return axios.delete(API_URL + `/vacancy/delete/${id}`, { withCredentials: true })
      .then(response => {
        location.reload()
        return response.data
      })
  }
}

export default new VacancyService()