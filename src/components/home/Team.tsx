import { INews } from '@/models/news'
import { ITeam } from '@/models/team'
import { Box, Container, styled } from '@mui/material'
import * as React from 'react'
import { MUICarousel } from '../commons/MUICarousel'
import { PlayerItem } from './PlayerItem'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export interface IProps {
  team: ITeam[]
}

export function Team({ team }: IProps) {
  return (
    <Box
      p={6}
      sx={{
        textAlign: 'center',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(/assets/images/home/bg-team.jpg)',
      }}
    >
      <Container>
        <MUICarousel title="đội hình thi đấu" titleColor="light">
          <>
            {team?.length &&
              team.map(item => (
                <div className="item" key={item.id}>
                  <PlayerItem item={item} />
                </div>
              ))}
          </>
        </MUICarousel>
      </Container>
    </Box>
  )
}
