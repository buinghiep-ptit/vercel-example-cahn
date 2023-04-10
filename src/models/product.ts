export interface IProduct {
  id?: number
  name?: string
  fullName?: string
  basePrice?: number
  description?: string
  code?: string
  unit?: string
  productType?: number
  imgUrl?: string[]
  attribute?: {
    attributeName?: string
    attributeValue?: string
  }[]
}
