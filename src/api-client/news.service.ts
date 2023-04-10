import { INews, INewsDetail } from '@/models'
import { ICategoryNews } from '@/models/category'
import { http } from './http-config'

export const fetchNewsList = async (
  categoryId?: string,
  params?: { index?: number; size?: number; keyword?: string },
): Promise<INews[]> => {
  const url = `/cahnfc/api/public/news?categoryId=${categoryId}`
  const { data } = await http.get<INews[]>(url, { params })
  return data
}

export const fetchNewsCategories = async (): Promise<ICategoryNews[]> => {
  const url = `/cahnfc/api/public/news/categories`
  const { data } = await http.get<ICategoryNews[]>(url)
  return data
}

export const fetchNewsDetail = async (newsId: number): Promise<INewsDetail> => {
  const url = `/cahnfc/api/public/news/${newsId}`
  const { data } = await http.get<INewsDetail>(url)
  return data
}

export const fetchNewsRelated = async (newsId: number): Promise<INews[]> => {
  const url = `/cahnfc/api/public/news/${newsId}/related-news`
  const { data } = await http.get<INews[]>(url)
  return data
}
