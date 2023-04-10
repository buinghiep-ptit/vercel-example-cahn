import { ICategoryTeam } from '@/models/category'
import { ICoach, ICoachDetail, IPlayer, IPlayerDetail } from '@/models/team'
import { http } from './http-config'

export const fetchTeamCategories = async (): Promise<ICategoryTeam[]> => {
  const url = `/cahnfc/api/public/teams`
  const { data } = await http.get<ICategoryTeam[]>(url)
  return data
}

export const fetchPlayerList = async (teamId: number): Promise<IPlayer[]> => {
  const url = `/cahnfc/api/public/teams/${teamId}/players`
  const { data } = await http.get<IPlayer[]>(url)
  return data
}

export const fetchCoaches = async (): Promise<ICoach[]> => {
  const url = `/cahnfc/api/public/coaches`
  const { data } = await http.get<ICoach[]>(url)
  return data
}

export const fetchPlayerDetail = async (
  playerId: number,
): Promise<IPlayerDetail> => {
  const url = `/cahnfc/api/public/players/${playerId}`
  const { data } = await http.get<IPlayerDetail>(url)
  return data
}

export const fetchCoachDetail = async (
  coachId: number,
): Promise<ICoachDetail> => {
  const url = `/cahnfc/api/public/coaches/${coachId}`
  const { data } = await http.get<ICoachDetail>(url)
  return data
}
