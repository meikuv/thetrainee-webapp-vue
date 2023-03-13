export interface IResumeItem {
  id: number
  username: string
  firstName: string
  lastName: string
  phone: string
  city: string
  gender: string
  birthDate: string
  position: string
  salary: string
  salaryMode: string
  aboutMe: string
  coreSkills: ICoreSkills[]
  workExperiences: IWorkExperiences[]
  studyPlaces: IStudyPlaces[]
  languages: ILanguages[]
}

export interface IWorkExperiences {
  id: number
  startDate: string
  endDate: string
  organization: string
  position: string
  aboutWork: string
}

export interface IStudyPlaces {
  id: number
  institution: string
  faculty: string
  specialization: string
  gradYear: string
}

export interface ILanguages {
  id: number
  language: number
}

export interface ICoreSkills {
  id: number
  skill: string
}