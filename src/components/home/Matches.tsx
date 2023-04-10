import { IMatch } from '@/models'
import { Box, Stack, styled, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { MUICarousel } from '../commons/MUICarousel'
import { MuiTypography } from '../commons/MuiTypography'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const ItemContainer = styled(Box)<IProps>({
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  cursor: 'pointer',
})

export interface IProps {
  matches?: IMatch[]
}

export function Matches({ matches }: IProps) {
  const renderItem = (item: IMatch) => {
    return (
      <ItemContainer maxWidth={{ xs: '100%', sm: 375 }}>
        <Stack
          direction={'row'}
          gap={2}
          alignItems="center"
          justifyContent={'space-between'}
          sx={{
            padding: '12px 16px',
            backgroundColor:
              new Date(item.matchEndDate ?? '').getTime() >=
              new Date().getTime()
                ? '#212529'
                : '#ED1E24',
          }}
        >
          <MuiTypography
            variant="subtitle2"
            ellipsis={'ellipsis'}
            lineclamp={1}
            sx={{
              textAlign: 'start',
              flex: 1,
            }}
          >
            {moment(item.matchStartDate).format('DD/MM/YYYY')},{' '}
            {'SVĐ quốc gia Mỹ Đình'}
          </MuiTypography>
          {new Date(item.matchStartDate ?? '').getTime() >
            new Date().getTime() && (
            <Stack direction={'row'} gap={1} alignItems="center">
              <Image
                src={'/assets/images/vuesax/football.svg'}
                alt="logo 1"
                width={20}
                height={20}
              />
              <MuiTypography
                variant="subtitle2"
                ellipsis={'ellipsis'}
                lineclamp={1}
                sx={{ fontSize: '0.9375rem' }}
              >
                {'Sắp diễn ra'}
              </MuiTypography>
            </Stack>
          )}
        </Stack>

        <JustifyBox flexDirection={'row'} py={2.5} gap={4} px={3}>
          <JustifyBox flexDirection={'column'} gap={1}>
            <Box width={80} height={80}>
              <LazyNextImage
                imgUrl={
                  item.team1Logo ?? '/assets/images/common/logo-default.png'
                }
                canHover={false}
              />
            </Box>

            <MuiTypography
              variant="h6"
              ellipsis={'ellipsis'}
              lineclamp={1}
              color={'secondary'}
            >
              {item.team1Name}
            </MuiTypography>
          </JustifyBox>

          <JustifyBox flexDirection={'column'} gap={1}>
            <Stack
              direction={'row'}
              bgcolor={'#212529'}
              borderRadius="12px"
              gap={1.5}
              px={2}
              pb={0.5}
              divider={<Typography variant="h3">-</Typography>}
            >
              <Typography variant="h3">{item.team1TotalGoal}</Typography>

              <Typography variant="h3">{item.team2TotalGoal}</Typography>
            </Stack>
            <MuiTypography
              variant="subtitle2"
              ellipsis={'ellipsis'}
              lineclamp={1}
              sx={{ color: '#ED1E24' }}
            >
              {item.leagueShortName}
            </MuiTypography>
          </JustifyBox>
          <JustifyBox flexDirection={'column'} gap={1}>
            <Box width={80} height={80}>
              <LazyNextImage
                imgUrl={
                  item.team2Logo ?? '/assets/images/common/logo-default.png'
                }
                canHover={false}
              />
            </Box>
            <MuiTypography
              variant="h6"
              ellipsis={'ellipsis'}
              lineclamp={1}
              color={'secondary'}
            >
              {item.team2Name}
            </MuiTypography>
          </JustifyBox>
        </JustifyBox>
      </ItemContainer>
    )
  }
  return (
    <>
      <MUICarousel title="Trận đấu" titleColor="light">
        <>
          {matches?.length &&
            matches.map(match => (
              <div className="item" key={match.matchId}>
                {renderItem(match)}
              </div>
            ))}
        </>
      </MUICarousel>
    </>
  )
}
