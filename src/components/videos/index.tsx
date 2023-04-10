import { fetchVideosList } from '@/api-client/videos.service'
import { ICatv } from '@/models'
import { Box, Container, Grid, Stack } from '@mui/material'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { HighLightCard } from '../commons/Cards/HighLightCard'
import { TVCard } from '../commons/Cards/TVCard'
import { MuiButton } from '../commons/MuiButton'
import { MuiTypography } from '../commons/MuiTypography'
import { SkeletonLoading } from '../commons/SkeletonLoading'

const PAGE_SIZE = 10

export interface IProps {}

export function Videos() {
  const router = useRouter()
  const { scope } = router.query

  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [`videos-list-${scope}`, scope],
    ({ pageParam }) =>
      fetchVideosList(!!Number(scope) ? Number(scope).toString() : '', {
        size: PAGE_SIZE,
        index: pageParam ? (pageParam - 1) * PAGE_SIZE : 0,
      }),
    {
      getNextPageParam: (_lastPage, pages) => {
        return _lastPage.length > 0 ? pages.length + 1 : undefined
      },
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 30 * 60 * 1000,
    },
  )

  if (isError)
    return (
      <Box my={2} textAlign="center">
        <MuiTypography variant="h3">{(error as any).message}</MuiTypography>
      </Box>
    )

  return (
    <Container>
      <Stack gap={6} py={4}>
        {data?.pages.flat() &&
          data?.pages.flat().length &&
          data?.pages.flat()[0] && (
            <HighLightCard item={data?.pages.flat()[0] as ICatv} />
          )}

        {data?.pages.flat()?.length && data?.pages.flat()?.length > 1 && (
          <Grid container spacing={3}>
            {data?.pages
              .flat()
              .slice(1)
              .map((item, index) => (
                <Grid item xs={12} sm={6} md={4} className="item" key={item.id}>
                  <TVCard
                    key={item.id}
                    item={item}
                    width="100%"
                    index={index}
                  />
                </Grid>
              ))}
          </Grid>
        )}

        {isFetching && (
          <Grid container spacing={3}>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <SkeletonLoading />
                </Grid>
              ))}
          </Grid>
        )}

        {hasNextPage && (
          <Stack alignItems={'center'}>
            <MuiButton
              variant="outlined"
              loading={isFetchingNextPage}
              sx={{ width: 200, borderRadius: 2 }}
              color="secondary"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              title={isFetchingNextPage ? 'Đang tải...' : 'Xem thêm'}
            />
          </Stack>
        )}
      </Stack>
    </Container>
  )
}
