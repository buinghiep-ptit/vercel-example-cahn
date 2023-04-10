import { ITeam } from '@/models/team'
import { Box, styled, Typography } from '@mui/material'
import * as React from 'react'
import { LazyNextImage } from '../LazyNextImage'

const ItemContainer = styled(Box)({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export interface IProps {
  item: ITeam
  width?: string
  children?: React.ReactElement
}

export function PlayerCard({ item, width, children }: IProps) {
  const [hover, setHover] = React.useState(false)
  const handleOnMouseEnter = () => {
    setHover(true)
  }

  const handleOnMouseLeave = () => {
    setHover(false)
  }

  return (
    <ItemContainer
      width={width || 304}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <Box position="relative" pt={6} pr={7}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#FFFFFF',
            aspectRatio: 'calc(3/4)',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <Box className={`${hover ? 'ani-player-overlay' : ''}`}></Box>
          {item.jerseyNo && (
            <Typography
              variant="h1"
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                textAlign: 'start',
                letterSpacing: '1px',
                lineHeight: 1,
                transition: '0.5s ease-in-out',
                color: hover ? '#ED1E24' : '#CED4DA',
                p: 1.5,
                mt: -2.5,
                zIndex: 999,
              }}
            >
              {item.jerseyNo}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 9,
            width: width ? `calc(100% - 24px)` : '280px',
            height: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          <LazyNextImage canOverlay={false} imgUrl={item.imageUrl} />
        </Box>
      </Box>
      {children}
    </ItemContainer>
  )
}
