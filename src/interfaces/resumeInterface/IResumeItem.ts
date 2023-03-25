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
  deleted: string
  startDate: string
  endDate: string
  organization: string
  position: string
  aboutWork: string
}

export interface IStudyPlaces {
  institution: string
  faculty: string
  specialization: string
  gradYear: string
  deleted: string
}

export interface ILanguages {
  language: number
  deleted: string
}

export interface ICoreSkills {
  skill: string
  deleted: string
}