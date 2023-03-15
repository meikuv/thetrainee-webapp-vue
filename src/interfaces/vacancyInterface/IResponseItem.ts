export interface ISkill {
  skill: string
}

export interface IRequirements {
  reqName: string
}

export interface IDependencies {
  depName: string
}

export interface IWorkConditions {
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