import { IBanner } from '@/models/banner'
import { FMSwiperSlider } from '../commons/FMSwiperSilder'

export interface IProps {
  data?: IBanner[]
}

export function Banner({ data }: IProps) {
  return <div>{data?.length && <FMSwiperSlider slides={data ?? []} />}</div>
}
