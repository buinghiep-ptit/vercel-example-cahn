import { http } from './http-config'

export const fetchDataHome = async (section: string): Promise<any[]> => {
  let url = ''
  if (section === 'categories' || section === 'products') {
    url = `/store/api/public/${section}`
  } else {
    url = `/cahnfc/api/public/homepage/${section}`
  }
  const { data } = await http.get<any[]>(url)
  return data
}
