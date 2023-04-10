import {
  fetchVideoDetail,
  fetchVideosRelated,
} from '@/api-client/videos.service'
import { AppLoading } from '@/components/commons/AppLoading'
import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { TVCard } from '@/components/commons/Cards/TVCard'
import { MediaViewItem } from '@/components/commons/MediaViewItem'
import { MUICarousel } from '@/components/commons/MUICarousel'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { PrimaryLayout } from '@/layouts'
import { ICatv } from '@/models'
import { TypeCardToLabel } from '@/utils'
import { Box, Container, Divider, Grid, IconButton, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IProps {}

export default function VideoDetailPage() {
  const router = useRouter()
  const { slugId } = router.query

  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useQuery<ICatv, Error>(
    ['video', slugId],
    () => fetchVideoDetail(Number(slugId ?? 0)),
    {
      enabled: !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: videosRelated } = useQuery<ICatv[], Error>(
    ['videos-related', slugId],
    () => fetchVideosRelated(Number(slugId ?? 0)),
    {
      enabled: !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const leftDetail = (video: ICatv) => {
    return (
      <Stack gap={3}>
        <Box
          sx={{
            aspectRatio: 'calc(1170/660)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          {/* <LazyNextImage imgUrl={video.imgUrl ?? ''} canHover={false} /> */}
          <MediaViewItem media={video} />
        </Box>

        <Grid
          container
          display="flex"
          justifyContent={'center'}
          flexDirection="row"
        >
          <Grid item xs={12} md={8}>
            <MuiTypography
              variant="h2"
              color={'secondary'}
              ellipsis={'ellipsis'}
              my={1.5}
            >
              {video.title}
            </MuiTypography>

            <Stack
              direction={'row'}
              alignItems="center"
              justifyContent={'space-between'}
            >
              <Stack
                direction={'row'}
                alignItems="center"
                gap={1}
                divider={
                  <Divider
                    orientation="vertical"
                    sx={{ background: '#D9D9D9', my: 0.5 }}
                    flexItem
                  />
                }
              >
                <MuiTypography
                  variant="subtitle1"
                  sx={{
                    fontFamily: 'UTM Bebas',
                    color: '#ED1E24',
                    fontWeight: 400,
                    letterSpacing: '1px',
                  }}
                >
                  {TypeCardToLabel(video.type ?? 0)}
                </MuiTypography>
                <MuiTypography
                  variant="body2"
                  sx={{
                    color: '#495057',
                    lineHeight: 1,
                    pt: 0.25,
                  }}
                >
                  {moment(video.dateUpdated).format('HH:ss, DD/MM/YYYY')}
                </MuiTypography>
              </Stack>
              <IconButton>
                <Image
                  src={'/assets/images/vuesax/share.svg'}
                  alt="icon"
                  width={20}
                  height={20}
                />
              </IconButton>
            </Stack>

            <MuiTypography variant="body1" color={'secondary'} mt={3}>
              {video.description}
            </MuiTypography>
          </Grid>
        </Grid>
      </Stack>
    )
  }

  if (isLoading) return <AppLoading />

  if (isError)
    return (
      <Box my={2} textAlign="center">
        <MuiTypography variant="h3">
          Have an errors: {error.message}
        </MuiTypography>
      </Box>
    )

  return (
    <Box sx={{ pt: 14 }}>
      <Container sx={{ pt: 2, pb: 3.5 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Tin tức', path: '/news' },
            { name: 'Chi tiết' },
          ]}
        />

        <Stack
          gap={6}
          divider={
            <Divider
              orientation="horizontal"
              sx={{ background: '#E9ECEF' }}
              flexItem
            />
          }
        >
          <Stack mt={3}>{video && leftDetail(video)}</Stack>
          <MUICarousel
            title="Video liên quan"
            titleColor="dark"
            fontSizeTitle="medium"
          >
            <>
              {videosRelated?.length &&
                videosRelated.map((item, index) => (
                  <div className="item" key={item.id}>
                    <TVCard item={item} index={index} />
                  </div>
                ))}
            </>
          </MUICarousel>
        </Stack>
      </Container>
    </Box>
  )
}

VideoDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
