import { IPost } from '@/models'
import { http } from './http-config'

export const fetchPosts = async (): Promise<IPost[]> => {
  const { data } = await http.get<any>('/product/api/public/news/spotlight')
  return data
}
