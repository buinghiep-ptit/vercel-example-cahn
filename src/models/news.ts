export interface INews {
  id?: number
  type?: number
  categoryId?: number
  imgUrl?: string
  category?: string
  description?: string
  title?: string
  datePublished?: string
}

export interface INewsDetail {
  id?: number
  title?: string
  description?: string
  content?: string
  type?: number
  url?: string
  imgUrl?: string
  priority?: number
  keyWords?: string[]
  status?: number
  dateCreated?: string
  dateUpdated?: string
}
