import {
  fetchCoachDetail,
  fetchNewsList,
  fetchPlayerDetail,
} from '@/api-client'
import { fetchVideosList } from '@/api-client/videos.service'
import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { ICatv, INews } from '@/models'
import { ICoachDetail, IPlayerDetail } from '@/models/team'
import { Box, Container, Divider, Grid, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { NewsCard } from '../commons/Cards/NewsCard'
import { TVCard } from '../commons/Cards/TVCard'
import { LazyNextImage } from '../commons/LazyNextImage'
import { MUICarousel } from '../commons/MUICarousel'
import { MuiTypography } from '../commons/MuiTypography'

export interface IPlayerDetailProps {}

export function PlayerDetail(props: IPlayerDetailProps) {
  const router = useRouter()
  const { slugId, scope } = router.query

  const isPlayer = scope && Number(scope) > 0

  const { data: player } = useQuery<IPlayerDetail, Error>(
    ['player', slugId],
    () => fetchPlayerDetail(Number(slugId ?? 0)),
    {
      enabled: !!isPlayer && !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: coach } = useQuery<ICoachDetail, Error>(
    ['coach', slugId],
    () => fetchCoachDetail(Number(slugId ?? 0)),
    {
      enabled: !isPlayer && !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: newsRelated } = useQuery<INews[], Error>(
    [`news-related-${slugId}-${scope}`, slugId, scope, player],
    () => fetchNewsList('', { keyword: isPlayer ? player?.name : coach?.name }),
    {
      enabled: (isPlayer && !!player) || (!isPlayer && !!coach),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: videosRelated } = useQuery<ICatv[], Error>(
    [`videos-related-${slugId}-${scope}`, slugId, scope, player],
    () =>
      fetchVideosList('', { search: isPlayer ? player?.name : coach?.name }),
    {
      enabled: (isPlayer && !!player) || (!isPlayer && !!coach),
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const achievementPlayer = (icon: string, title?: string, num?: number) => {
    return (
      <Grid item xs={6} md={3}>
        <Stack gap={3} alignItems="center">
          <Image src={icon} width={28} height={28} alt="" />
          <Stack gap={1} alignItems={'center'}>
            <MuiTypography variant="subtitle2">{title}</MuiTypography>
            <MuiTypography variant="h3">{num ?? 0}</MuiTypography>
          </Stack>
        </Stack>
      </Grid>
    )
  }

  const rowInfo = (title?: string, info?: string) => {
    return (
      <Stack direction={'row'} alignItems={'center'}>
        <MuiTypography
          variant="body1"
          fontWeight={500}
          sx={{ color: '#868E96', flex: 1 }}
        >
          {title}
        </MuiTypography>
        <MuiTypography
          variant="body1"
          fontWeight={500}
          color={'secondary'}
          sx={{ flex: 1 }}
        >
          {info}
        </MuiTypography>
      </Stack>
    )
  }

  return (
    <Box bgcolor={'#FFFFFF'}>
      <Box
        sx={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/player/bg-player.jpg)',
          pt: 3,
        }}
      >
        <Container>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Stack alignItems={'flex-end'} position="relative">
                {isPlayer && (
                  <MuiTypography
                    variant="h1"
                    fontSize="23rem!important"
                    sx={{
                      position: 'absolute',
                      top: -72,
                      left: 0,
                      letterSpacing: '1px',
                      lineHeight: 1.25,
                      zIndex: 1,
                      color: '#CED4DA',
                    }}
                  >
                    {player?.jerseyNo ?? '00'}
                  </MuiTypography>
                )}
                <Box
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: 'calc(3/4)',
                    borderRadius: '12px 12px 0 0',
                    width: '72%',
                    zIndex: 9,
                  }}
                >
                  <LazyNextImage canHover={false} imgUrl={player?.imageUrl} />
                </Box>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              alignItems={'flex-end'}
              pl={12}
            >
              <Stack gap={15} width="100%">
                <Stack>
                  <MuiTypography variant="h5" sx={{ color: '#ED1E24' }}>
                    {isPlayer
                      ? player?.strMainPosition
                      : 'Huấn luyện viên trưởng'}
                  </MuiTypography>
                  <MuiTypography
                    variant="h2"
                    color={'secondary'}
                    fontSize={'4rem'}
                  >
                    {isPlayer ? player?.fullName : coach?.fullName}
                  </MuiTypography>
                </Stack>

                <Box
                  bgcolor={isPlayer ? '#ED1E24' : '#212529'}
                  px={2}
                  py={4}
                  sx={{ borderRadius: '16px 16px 0px 0px' }}
                  width={'100%'}
                >
                  {isPlayer ? (
                    <Grid container>
                      {achievementPlayer(
                        '/assets/images/vuesax/horn.svg',
                        'Trận tham gia',
                        player?.matchPlayedNo,
                      )}
                      {achievementPlayer(
                        `/assets/images/vuesax/${
                          player?.mainPosition === 1
                            ? 'ball-prevent'
                            : 'ball-goal'
                        }.svg`,
                        player?.mainPosition === 1
                          ? 'Giữ sạch lưới'
                          : 'Bàn thắng',
                        player?.mainPosition === 1
                          ? player.cleanSheetNo
                          : player?.matchWinNo,
                      )}
                      {achievementPlayer(
                        '/assets/images/vuesax/yellow-card.svg',
                        'Thẻ vàng',
                        player?.yellowCardNo,
                      )}
                      {achievementPlayer(
                        '/assets/images/vuesax/red-card.svg',
                        'Thẻ đỏ',
                        player?.redCardNo,
                      )}
                    </Grid>
                  ) : (
                    <MuiTypography variant="subtitle2">
                      {
                        'Trong sự nghiệp cầm quân, HLV Paulo Foiani đã dẫn dắt 21 CLB tại Brazil. Thành tích nổi bật của ông là giúp CLB Sociedade Esportiva Juazeirense giành á quân Copa Governador Da Bahia và tham dự Copa Do Brazil (Cúp Quốc gia Brazil) vào năm 2015. Năm 2019, 2021, ông tiếp tục giúp các CLB Sinop Futebol và Sportivo giành vé dự Copa Do Brazil.'
                      }
                    </MuiTypography>
                  )}
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container>
        <Box py={8}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box p={3} bgcolor={'#F8F9FA'} borderRadius={3}>
                <MuiTypography variant="h4" color={'secondary'}>
                  {isPlayer
                    ? 'Thông tin cá cầu thủ'
                    : 'Thông tin huấn luyện viên'}
                </MuiTypography>
                {isPlayer && (
                  <Stack
                    mt={3}
                    gap={2}
                    divider={
                      <Divider
                        orientation="horizontal"
                        sx={{ background: '#E9ECEF' }}
                        flexItem
                      />
                    }
                  >
                    {rowInfo('Quê quán:', player?.placeOfOrigin)}
                    {rowInfo(
                      'Ngày sinh:',
                      moment(new Date(player?.dateOfBirth ?? '')).format(
                        'DD/MM/YYYY',
                      ),
                    )}
                    {rowInfo(
                      'Ngày tham gia:',
                      moment(new Date(player?.dateJoined ?? '')).format(
                        'DD/MM/YYYY',
                      ),
                    )}
                    {rowInfo('Chiều cao:', player?.height + ' cm')}
                    {rowInfo('Cân nặng:', player?.weight + ' kg')}
                  </Stack>
                )}
                {!isPlayer && (
                  <Stack
                    mt={3}
                    gap={2}
                    divider={
                      <Divider
                        orientation="horizontal"
                        sx={{ background: '#E9ECEF' }}
                        flexItem
                      />
                    }
                  >
                    {rowInfo('Họ tên:', coach?.fullName)}
                    {rowInfo('Quốc tịch:', coach?.citizenship)}
                    {rowInfo(
                      'Ngày sinh:',
                      moment(new Date(coach?.dateOfBirth ?? '')).format(
                        'DD/MM/YYYY',
                      ),
                    )}
                    {rowInfo(
                      'Ngày tham gia:',
                      moment(new Date(coach?.dateJoined ?? '')).format(
                        'DD/MM/YYYY',
                      ),
                    )}
                  </Stack>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              display="flex"
              alignItems={'flex-end'}
              pl={12}
            >
              <Stack gap={3}>
                <MuiTypography variant="h4" color={'secondary'}>
                  {'tiểu sử'}
                </MuiTypography>
                <MuiTypography variant="body1" color={'secondary'}>
                  {isPlayer ? player?.biography : coach?.biography}
                </MuiTypography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Divider
          orientation="horizontal"
          sx={{ bgcolor: '#DEE2E6' }}
          flexItem
        />
      </Container>

      {!!newsRelated?.length && (
        <Container>
          <Box py={6}>
            <MUICarousel
              title="Tin tức"
              titleColor="dark"
              fontSizeTitle="medium"
            >
              <>
                {newsRelated.map(item => (
                  <div className="item" key={item.id}>
                    <NewsCard item={item} />
                  </div>
                ))}
              </>
            </MUICarousel>
          </Box>
        </Container>
      )}

      {!!videosRelated?.length && (
        <Container>
          <Box py={6}>
            <MUICarousel title="Video" titleColor="dark" fontSizeTitle="medium">
              <>
                {videosRelated.map((item, index) => (
                  <div className="item" key={item.id}>
                    <TVCard item={item} index={index} />
                  </div>
                ))}
              </>
            </MUICarousel>
          </Box>
        </Container>
      )}
    </Box>
  )
}
