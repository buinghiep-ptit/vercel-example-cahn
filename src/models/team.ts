export interface ITeam {
  id?: number
  name?: string
  imageUrl?: string
  jerseyNo?: number | undefined
  position?: string
}

export interface IPlayer {
  id?: number
  name?: string
  mainPosition?: number
  imageUrl?: string
  jerseyNo?: number
  position?: string
}
export interface ICoach {
  name?: string
  id?: number
  imageUrl?: string
  position?: string
}

export interface IPlayerDetail {
  id?: number
  name?: string
  fullName?: string
  mobilePhone?: string
  citizenIdCard?: string
  dateCitizenId?: string
  passport?: string
  datePassport?: string
  dateExpirePassport?: string
  placeOfOrigin?: string
  citizenship?: string
  idTeam?: number
  dateOfBirth?: string
  dateJoined?: string
  dateExpireContract?: string
  maritalStatus?: number
  shirtSize?: string
  shoseSize?: string
  nailShoseSize?: string
  height?: number
  weight?: number
  imageUrl?: string
  jerseyNo?: number
  dominantFoot?: string
  matchWinNo?: number
  cleanSheetNo?: number
  matchPlayedNo?: number
  yellowCardNo?: number
  redCardNo?: number
  oldClub?: string
  biography?: number
  isDisplayHome?: number
  priority?: number
  status?: number
  dateCreated?: string
  dateUpdated?: string
  position?: string
  mainPosition?: number
  strMainPosition?: string
}

export interface ICoachDetail {
  id?: number
  name?: string
  fullName?: string
  mobilePhone?: string
  citizenIdCard?: string
  dateCitizenId?: string
  passport?: string
  datePassport?: string
  dateExpirePassport?: string
  placeOfOrigin?: string
  citizenship?: string
  dateOfBirth?: string
  dateJoined?: string
  dateExpireContract?: string
  maritalStatus?: number
  shirtSize?: string
  shoseSize?: string
  nailShoseSize?: string
  height?: number
  weight?: number
  imageUrl?: string
  matchJoinedNo?: number
  cupNo?: number
  yellowCardNo?: number
  redCardNo?: number
  oldClub?: string
  biography?: string
  status?: number
  dateCreated?: string
  dateUpdated?: string
}
