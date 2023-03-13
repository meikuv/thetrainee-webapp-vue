export interface ISkill {
  id: number
  skill: string
}

export interface IRequirements {
  id: number
  reqName: string
}

export interface IDependencies {
  id: number
  depName: string
}

export interface IWorkConditions {
  id: number
  conName: string
}

export interface IResponseItem {
  id: number
  username: string
  companyName: string
  jobName: string
  city: string
  basicSkills: ISkill[]
  requirements: IRequirements[]
  dependencies: IDependencies[]
  conditions: IWorkConditions[]
}