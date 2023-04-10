export interface IMatch {
  matchStartDateReal?: string | undefined
  team1EventPlayer?: string | undefined
  team2EventPlayer?: string | undefined
  leagueLogo?: string | undefined
  matchId?: number
  matchStartDate?: string | undefined
  matchEndDate?: string | undefined
  team1Id?: number
  team1Name?: string
  team1Logo?: string
  team1TotalGoal?: number
  team1Round1Goal?: number
  team1EventType?: number
  team1EventTime?: string | undefined
  team2Id?: number
  team2Name?: string
  team2Logo?: string | undefined
  team2TotalGoal?: number
  leagueShortName?: string
  leagueId?: number
  leagueName?: string
  team2Round1Goal?: number
  team2EventType?: string | undefined | number
  team2EventTime?: string | undefined
}
