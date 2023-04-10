import { ICatv } from '@/models'
import { ICategoryVideo } from '@/models/category'
import { http } from './http-config'

export const fetchVideosList = async (
  categoryId?: string,
  params?: { index?: number; size?: number; search?: string },
): Promise<ICatv[]> => {
  const url = `/cahnfc/api/public/videos?type=${categoryId}`
  const { data } = await http.get<ICatv[]>(url, { params })
  return data
}

export const fetchVideosCategories = async (): Promise<ICategoryVideo[]> => {
  const url = `/cahnfc/api/public/videos/type`
  const { data } = await http.get<ICategoryVideo[]>(url)
  return data
}

export const fetchVideoDetail = async (videoId: number): Promise<ICatv> => {
  const url = `/cahnfc/api/public/videos/${videoId}`
  const { data } = await http.get<ICatv>(url)
  return data
}

export const fetchVideosRelated = async (videoId: number): Promise<ICatv[]> => {
  const url = `/cahnfc/api/public/videos/${videoId}/relatedVideos`
  const { data } = await http.get<ICatv[]>(url)
  return data
}
