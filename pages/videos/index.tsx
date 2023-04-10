import { fetchVideosCategories } from '@/api-client/videos.service'
import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { CustomizeTabs, IRoute } from '@/components/commons/CustomizeTabs'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { Videos } from '@/components/videos'
import { PrimaryLayout } from '@/layouts'
import { ICategoryVideo } from '@/models/category'
import { Box, Container, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as React from 'react'

const extractCategories = (categories: ICategoryVideo[]) => {
  return categories.map(item => ({
    scope: item.idData,
    label: item.typeTeam,
  }))
}

export interface IProps {}

function VideosPage() {
  const router = useRouter()
  const { scope } = router.query
  const { data: categories } = useQuery<ICategoryVideo[], Error>(
    ['categories-video'],
    () => fetchVideosCategories(),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  )

  const getCurrentTabIndex = (scope: number) => {
    const index = [
      { scope: 0, label: 'Toàn bộ' },
      ...extractCategories(categories ?? []),
    ].findIndex(item => scope == item.scope)
    if (index === -1) {
      return 0
    }

    return index
  }

  const [currentTab, setCurrentTab] = React.useState<number>(0)

  React.useEffect(() => {
    if (router.isReady && categories) {
      setCurrentTab(getCurrentTabIndex(Number(scope ?? 0)))
    }
  }, [router.query, categories])

  return (
    <Box sx={{ pt: 14, bgcolor: '#F8F9FA' }}>
      <Box
        sx={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/news/bg-header-news.jpg)',
        }}
      >
        <Container sx={{ pt: 2, pb: 3.5 }}>
          <Stack gap={6}>
            <Breadcrumb routeSegments={[{ name: 'Video' }]} textColor="light" />
            <MuiTypography
              variant="h2"
              fontSize={'3.5rem!important'}
              letterSpacing={'1px'}
            >
              Video
            </MuiTypography>
          </Stack>
        </Container>
      </Box>
      {categories?.length && (
        <Stack width={'100%'} bgcolor="#FFFFFF">
          <CustomizeTabs
            items={
              ([
                { scope: 0, label: 'Toàn bộ' },
                ...extractCategories(categories ?? []),
              ] ?? []) as IRoute[]
            }
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Stack>
      )}
      <Videos />
    </Box>
  )
}

export default VideosPage
VideosPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
