import { fetchTeamCategories } from '@/api-client'
import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { CustomizeTabs, IRoute } from '@/components/commons/CustomizeTabs'
import { MuiTypography } from '@/components/commons/MuiTypography'
import { PlayerList } from '@/components/teams'
import { PrimaryLayout } from '@/layouts'
import { ICategoryTeam } from '@/models/category'
import { Box, Container, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as React from 'react'

const extractCategories = (categories: ICategoryTeam[]) => {
  return categories.map(item => ({
    scope: item.id,
    label: item.name,
  }))
}

export interface ITeamPageProps {}

function TeamsPage(props: ITeamPageProps) {
  const router = useRouter()
  const { scope } = router.query

  const { data: categories } = useQuery<ICategoryTeam[], Error>(
    ['teams-categories'],
    () => fetchTeamCategories(),
    {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
    },
  )

  const getCurrentTabIndex = (scope: number) => {
    const index = [
      ...extractCategories(categories ?? []),
      { scope: 0, label: 'Ban huấn luyện' },
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

  const convertCategoryToLabel = () => {
    if (scope && Number(scope) === 0) return 'Ban huấn luyện'
    const category = categories?.find(c => c.id === Number(scope))
    return category && category.isMain ? 'Đội hình chính' : category?.name
  }

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
            <Breadcrumb
              routeSegments={[{ name: 'Đội hình' }]}
              textColor="light"
            />
            <MuiTypography
              variant="h2"
              fontSize={'3.5rem!important'}
              letterSpacing={'1px'}
            >
              {convertCategoryToLabel()}
            </MuiTypography>
          </Stack>
        </Container>
      </Box>
      {categories?.length && (
        <Stack width={'100%'} bgcolor="#FFFFFF">
          <CustomizeTabs
            items={
              ([
                ...extractCategories(categories ?? []),
                { scope: 0, label: 'Ban huấn luyện' },
              ] ?? []) as IRoute[]
            }
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </Stack>
      )}
      <PlayerList />
    </Box>
  )
}

export default TeamsPage
TeamsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
