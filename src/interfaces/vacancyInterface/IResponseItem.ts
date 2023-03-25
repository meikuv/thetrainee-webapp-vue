export interface ISkill {
  deleted: string
  skill: string
}

export interface IRequirements {
  deleted: string
  reqName: string
}

export interface IDependencies {
  deleted: string
  depName: string
}

export interface IWorkConditions {
  deleted: string
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