import { ITeam } from '@/models/team'
import { Typography } from '@mui/material'
import { PlayerCard } from '../commons/PlayerCard'

export interface IProps {
  item: ITeam
  width?: string
}

export function PlayerItem({ item, width }: IProps) {
  return (
    <PlayerCard item={item} width={width}>
      <Typography
        color={'primary'}
        textAlign="start"
        sx={{
          fontSize: '1.25rem',
          lineHeight: 1.5,
          fontWeight: 600,
          mt: 2.5,
        }}
      >
        <span style={{ color: '#FFD200', fontWeight: 500 }}>
          {item.position}
        </span>{' '}
        {item.name}
      </Typography>
    </PlayerCard>
  )
}
