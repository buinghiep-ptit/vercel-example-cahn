import { fetchDataHome, fetchNewsDetail, fetchNewsRelated } from '@/api-client'
import { AppLoading } from '@/components/commons/AppLoading'
import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { NewsCard } from '@/components/commons/Cards/NewsCard'
import { LazyNextImage } from '@/components/commons/LazyNextImage'
import { MUICarousel } from '@/components/commons/MUICarousel'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { NewsRanking } from '@/components/news/news-ranking'
import { PrimaryLayout } from '@/layouts'
import { INews, INewsDetail, IRank } from '@/models'
import { TypeCardToLabel } from '@/utils'
import { Box, Container, Divider, Grid, IconButton, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IProps {}

export default function NewsDetailPage() {
  const router = useRouter()
  const { slugId } = router.query

  const {
    data: news,
    isLoading,
    isError,
    error,
  } = useQuery<INewsDetail, Error>(
    ['news', slugId],
    () => fetchNewsDetail(Number(slugId ?? 0)),
    {
      enabled: !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: newsRelated } = useQuery<INews[], Error>(
    ['news-related', slugId],
    () => fetchNewsRelated(Number(slugId ?? 0)),
    {
      enabled: !!slugId,
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const { data: newsRanking } = useQuery<IRank[], Error>(
    ['news-ranking', slugId],
    () => fetchDataHome('ranking'),
    {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const leftDetail = (news: INewsDetail) => {
    return (
      <Stack gap={3}>
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
              {TypeCardToLabel(news.type ?? 0)}
            </MuiTypography>
            <MuiTypography
              variant="body2"
              sx={{
                color: '#495057',
                lineHeight: 1,
                pt: 0.25,
              }}
            >
              {moment(news.dateUpdated).format('HH:ss, DD/MM/YYYY')}
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

        <MuiTypography
          variant="subtitle2"
          fontSize={'1.125rem'}
          color={'secondary'}
        >
          {news.description}
        </MuiTypography>

        <Box
          sx={{
            aspectRatio: 'calc(3/2)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          <LazyNextImage imgUrl={news.imgUrl} canHover={false} />
        </Box>

        <MuiTypography variant="body1" color={'secondary'}>
          {news.content}
        </MuiTypography>

        <MuiTypography
          textAlign={'end'}
          variant="body1"
          color={'secondary'}
          fontWeight={600}
        >
          {'Theo tên tác giả'}
        </MuiTypography>

        <Stack flexDirection={'row'} flexWrap="wrap" gap={1.5} mt={2}>
          <MuiTypography variant="body1" color={'secondary'} fontWeight={400}>
            {'Từ khóa:'}
          </MuiTypography>
          {news.keyWords?.map((word, index) => (
            <MuiTypography
              key={index}
              variant="body1"
              fontWeight={500}
              sx={{ whiteSpace: 'nowrap', color: '#ED1E24' }}
            >
              <Link href={''} passHref>
                {word}
              </Link>
            </MuiTypography>
          ))}
        </Stack>
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
        <Grid container>
          <Grid item xs={12} md={8}>
            <MuiTypography
              variant="h2"
              color={'secondary'}
              ellipsis={'ellipsis'}
              my={1.5}
            >
              {news.title}
            </MuiTypography>
          </Grid>
        </Grid>

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
          <Grid container spacing={4.5}>
            <Grid item xs={12} md={8}>
              {news && leftDetail(news)}
            </Grid>
            <Grid item xs={12} md={4}>
              {!!newsRanking?.length && <NewsRanking data={newsRanking} />}
            </Grid>
          </Grid>

          <MUICarousel
            title="Tin liên quan"
            titleColor="dark"
            fontSizeTitle="medium"
          >
            <>
              {newsRelated?.length &&
                newsRelated.map(item => (
                  <div className="item" key={item.id}>
                    <NewsCard item={item} />
                  </div>
                ))}
            </>
          </MUICarousel>
        </Stack>
      </Container>
    </Box>
  )
}

NewsDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
