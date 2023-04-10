import { IRank, IMatch } from '@/models'
import { weekday } from '@/utils'
import { Box, Grid, Stack, Typography } from '@mui/material'
import _ from 'lodash'
import moment from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { MuiTrapezoid } from '../commons/MUITrapezoid'
import { AccordionRanking } from './AccordionRanking'
import { CountdownTimer } from './CountDownNextMatch'
import { JustifyBox } from './Matches'

export interface IProps {
  match: IMatch
  ranks: IRank[]
}

export function TrapezoidInfo({ match, ranks }: IProps) {
  const [tabIndex, setTabIndex] = React.useState(0)

  const THREE_DAYS_IN_MS = 18 * 24 * 60 * 60 * 1000
  const NOW_IN_MS = new Date().getTime()

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS

  return (
    <>
      <Stack pb={10} display="flex" alignItems={'center'}>
        <Stack
          direction={'row'}
          sx={{
            width: 'calc(60vw - 120px)',
            height: '40px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <MuiTrapezoid
            onMouseDown={() => setTabIndex(0)}
            background={tabIndex === 0 ? '#ffd200' : '#FFFFFF'}
            direction="down"
            borderradiusbefore="5px 0 0 0"
            borderradiusafter="0 5px 0 0"
            sx={{
              width: '30vw',
              height: '100%',
              position: 'relative',
              transition: '0.5s ease-in-out',
              cursor: 'pointer',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color:
                  tabIndex === 0 ? 'secondary.main' : 'secondary.contrastText',
                zIndex: 1,
              }}
            >
              {match.leagueShortName}
            </Typography>
          </MuiTrapezoid>
          <MuiTrapezoid
            onMouseDown={() => setTabIndex(1)}
            background={tabIndex === 1 ? '#ffd200' : '#FFFFFF'}
            direction="down"
            borderradiusbefore="5px 0 0 0"
            borderradiusafter="0 5px 0 0"
            sx={{
              width: '30vw',
              height: '100%',
              position: 'relative',
              transition: '0.5s ease-in-out',
              cursor: 'pointer',
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color:
                  tabIndex === 1 ? 'secondary.main' : 'secondary.contrastText',
                zIndex: 1,
              }}
            >
              {'BẢNG XẾP HẠNG'}
            </Typography>
          </MuiTrapezoid>
        </Stack>
        <Box position={'relative'} mt={'-3px'}>
          <MuiTrapezoid
            background={'#ffd200'}
            direction="up"
            bordertrapezoid="#212529"
            borderradiusbefore="5px 0 0 5px"
            borderradiusafter="0 5px 5px 0"
            sx={{
              width: '60vw',
              height: '56px',
              position: 'relative',
            }}
          >
            <Stack
              flexDirection={'row'}
              justifyContent="space-between"
              width="100%"
              px={tabIndex === 0 ? 9 : 3.5}
            >
              {tabIndex === 0 && match && !_.isEmpty(match) && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      zIndex: 99,
                    }}
                  >
                    {match.team1Name}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      zIndex: 99,
                    }}
                  >
                    {match.team2Name}
                  </Typography>
                </>
              )}
              {tabIndex === 1 && (
                <Grid container zIndex={99}>
                  <Grid item xs={2}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                        letterSpacing: '1px',
                      }}
                    >
                      thứ hạng
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'primary.main',
                        zIndex: 99,
                        textAlign: 'left',
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
                        letterSpacing: '1px',
                      }}
                    >
                      ĐIỂM
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Stack>
          </MuiTrapezoid>
          <MuiTrapezoid
            background={'#212529'}
            direction="up"
            bordertrapezoid="#FFFFFF"
            borderradiusbefore="5px 0 0 5px"
            borderradiusafter="0 5px 5px 0"
            sx={{
              width: 'calc(60vw - 16px)',
              height: '48px',
              position: 'absolute',
              top: '4px',
              left: '8px',
            }}
          />
        </Box>
        {tabIndex === 0 && (
          <JustifyBox
            gap={7}
            py={5}
            px={2}
            sx={{
              width: 'calc(60vw - 60px)',
              bgcolor: '#FFFFFF',
              mt: '-4px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            {match && !_.isEmpty(match) && (
              <>
                <Box width={132} height={132}>
                  <LazyNextImage
                    imgUrl={
                      match.team1Logo ?? '/assets/images/logos/logo-1.svg'
                    }
                    canHover={false}
                  />
                </Box>

                <Stack gap={3}>
                  <Typography variant="subtitle1" color={'secondary'}>
                    BẮT ĐẦU SAU
                  </Typography>
                  <CountdownTimer
                    targetDate={new Date(match.matchStartDate ?? '').getTime()}
                  />
                  <Typography variant="subtitle2" color={'secondary'}>
                    {weekday(new Date(match.matchStartDate ?? '').getDay())},{' '}
                    {moment(match.matchStartDate).format('DD/MM/YYYY - HH:mm')}{' '}
                    - SVĐ Hàng Đẫy
                  </Typography>
                </Stack>
                <Box width={132} height={132}>
                  <LazyNextImage
                    imgUrl={
                      match.team2Logo ?? '/assets/images/logos/logo-1.svg'
                    }
                    canHover={false}
                  />
                </Box>
              </>
            )}
          </JustifyBox>
        )}
        {tabIndex === 1 && (
          <JustifyBox
            py={1}
            sx={{
              width: 'calc(60vw - 60px)',
              bgcolor: '#FFFFFF',
              mt: '-4px',
              borderBottomLeftRadius: '8px',
              borderBottomRightRadius: '8px',
            }}
          >
            {ranks?.length && <AccordionRanking data={ranks} />}
          </JustifyBox>
        )}
      </Stack>
    </>
  )
}
