import { IRank } from '@/models/ranking'
import { Box, Button, Divider, Grid, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { MuiTypography } from '../commons/MuiTypography'
import { JustifyBox } from '../home/CAHNTV'

export interface IProps {
  data: IRank[]
}

export function NewsRanking({ data }: IProps) {
  const [expanded, setExpanded] = React.useState<boolean>(false)

  const extractItems = (items: IRank[]) => {
    const idx = items.findIndex(item => item.idTeam === 1)
    if (!expanded) {
      if (idx < 8) return [...items.slice(0, 8)]
      else return [...items.slice(0, 7), ...items.slice(idx, idx + 1)]
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
          width="calc(100%)"
          height={'100%'}
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
              fontSize={'0.9375rem'}
              sx={{ textAlign: 'center' }}
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
                    imgUrl={
                      item.teamLogo ?? '/assets/images/common/logo-default.png'
                    }
                    canHover={false}
                  />
                </Box>

                <MuiTypography
                  color={'secondary'}
                  variant="subtitle2"
                  fontSize={'0.9375rem'}
                  ellipsis={'ellipsis'}
                  lineclamp={1}
                >
                  {item.teamName}
                </MuiTypography>
              </JustifyBox>
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'0.9375rem'}
              sx={{ textAlign: 'center' }}
            >
              {item.matchNum}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              color={'secondary'}
              variant="subtitle2"
              fontSize={'0.9375rem'}
              sx={{ textAlign: 'center' }}
            >
              {item.score}
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    )
  }

  return (
    <Stack
      width={'100%'}
      sx={{
        filter: 'drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.04))',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Stack
        gap={2.25}
        bgcolor="#212529"
        py={2}
        divider={
          <Divider
            orientation="horizontal"
            sx={{ backgroundColor: '#FFFFFF', opacity: 0.1 }}
            flexItem
          />
        }
      >
        <JustifyBox flexDirection={'row'} gap={1.5}>
          <Image
            src={'/assets/images/logo-border.svg'}
            width={32}
            height={32}
            alt=""
          />
          <MuiTypography
            variant="h5"
            fontSize={'1.5rem'}
            sx={{ letterSpacing: '1px' }}
          >
            v.league 2023
          </MuiTypography>
        </JustifyBox>
        <Grid container zIndex={99}>
          <Grid item xs={2}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                zIndex: 99,
                textAlign: 'center',
                fontSize: '1rem!important',
                letterSpacing: '1px',
              }}
            >
              hạng
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                zIndex: 99,
                textAlign: 'left',
                fontSize: '1rem!important',
                letterSpacing: '1px',
              }}
            >
              câu lạc bộ
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                zIndex: 99,
                textAlign: 'center',
                fontSize: '1rem!important',
                letterSpacing: '1px',
              }}
            >
              SỐ TRẬN
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                zIndex: 99,
                textAlign: 'center',
                fontSize: '1rem!important',
                letterSpacing: '1px',
              }}
            >
              ĐIỂM
            </Typography>
          </Grid>
        </Grid>
      </Stack>

      <Stack
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
