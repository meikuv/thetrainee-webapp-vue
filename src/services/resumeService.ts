import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL

class ResumeService {

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
    return axios.post(API_URL + `/resume/createResume/${resume.username}`, {
      resume: {
        username: resume.username,
        firstName: resume.firstName,
        lastName: resume.lastName,
        phone: resume.phone,
        city: resume.city,
        gender: resume.gender,
        birthDate: resume.birthDate,
        position: resume.position,
        salary: resume.salary,
        salaryMode: resume.salaryMode,
        aboutMe: resume.aboutMe,
        coreSkills: resume.coreSkills,
        workExperiences: resume.workExperiences,
        studyPlaces: resume.studyPlaces,
        languages: resume.languages,
      }
    }, { withCredentials: true })
    .then(response => {
      return response.data
    })
  }

  updateResume(resume: {
    id: number,
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
    return axios.put(API_URL + `/resume/update/${resume.id}`, {
      resume: {
        username: resume.username,
        firstName: resume.firstName,
        lastName: resume.lastName,
        phone: resume.phone,
        city: resume.city,
        gender: resume.gender,
        birthDate: resume.birthDate,
        position: resume.position,
        salary: resume.salary,
        salaryMode: resume.salaryMode,
        aboutMe: resume.aboutMe,
        coreSkills: resume.coreSkills,
        workExperiences: resume.workExperiences,
        studyPlaces: resume.studyPlaces,
        languages: resume.languages,
      }
    }, { withCredentials: true })
    .then(response => {
      return response.data
    })
  }

  deleteResume(id: number) {
    return axios.delete(API_URL + `/resume/delete/${id}`, { withCredentials: true })
      .then(response => {
        return response.data
      })
  }
}

export default new ResumeService()