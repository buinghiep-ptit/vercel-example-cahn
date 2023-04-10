import { IRank } from '@/models/ranking'
import { Box, Button, Divider, Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { JustifyBox } from './Matches'

export interface IProps {
  data: IRank[]
}

export function AccordionRanking({ data }: IProps) {
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const extractItems = (items: IRank[]) => {
    const idx = items.findIndex(item => item.idTeam === 1)
    if (!expanded) {
      if (idx < 4) return [...items.slice(0, 4)]
      else return [...items.slice(0, 3), ...items.slice(idx, idx + 1)]
    } else {
      return [...items]
    }
  }

  const toggleExpandRanking = () => {
    setExpanded(!expanded)
  }
  const renderRow = (item: IRank) => {
    return (
      <Stack
        direction={'row'}
        justifyContent="center"
        alignItems={'center'}
        width={'100%'}
        position="relative"
        py={1.5}
      >
        <Box
          bgcolor={item.idTeam === 1 ? '#FFD200' : '#FFFFFF'}
          position={'absolute'}
          width="calc(100% - 64px)"
          height={'100%'}
          borderRadius="4px"
        ></Box>
        <Grid
          container
          display={'flex'}
          justifyContent="space-between"
          alignItems={'center'}
          zIndex={99}
        >
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.rank}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'center'}
              flex={1}
            >
              <JustifyBox gap={1.5}>
                <Box width={32} height={32}>
                  <LazyNextImage
                    imgUrl={item.teamLogo ?? '/assets/images/logos/logo-1.svg'}
                    canHover={false}
                  />
                </Box>

                <Typography
                  color={'secondary'}
                  variant="subtitle2"
                  fontSize={'1rem'}
                >
                  {item.teamName}
                </Typography>
              </JustifyBox>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.matchNum}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'1rem'}
            >
              {item.score}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    )
  }

  return (
    <Stack width={'100%'}>
      <Stack
        mt={2}
        width="100%"
        divider={
          <Divider
            orientation="horizontal"
            sx={{ backgroundColor: '#F1F3F5', mx: 4 }}
            flexItem
          />
        }
      >
        {extractItems(data).map((item, index) => (
          <Box key={index}>{renderRow(item)}</Box>
        ))}
      </Stack>
      {data?.length > 3 && (
        <Button variant="text" onClick={toggleExpandRanking}>
          <Image
            src={
              expanded
                ? '/assets/images/vuesax/arrow-up.svg'
                : '/assets/images/vuesax/arrow-down.svg'
            }
            alt="logo 1"
            width={24}
            height={24}
            style={{
              filter:
                'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
            }}
          />
        </Button>
      )}
    </Stack>
  )
}
