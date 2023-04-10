export interface ICategoryNews {
  id?: number
  name?: string
  description?: string
}

export interface ICategoryVideo {
  idData?: number
  typeTeam?: string
}

export interface ICategoryTeam {
  id?: number
  name?: string
  description?: string
  logo?: string
  type?: number
  isMain?: number
  status?: number
}
