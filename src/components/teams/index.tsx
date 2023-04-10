import { fetchCoaches, fetchPlayerList } from '@/api-client'
import { ICoach, IPlayer } from '@/models/team'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MuiTypography } from '../commons/MuiTypography'
import { PlayerCard } from '../commons/PlayerCard'
import { SkeletonLoading } from '../commons/SkeletonLoading'

export interface IProps {}

export function PlayerList(props: IProps) {
  const router = useRouter()
  const { scope } = router.query
  const [data, setData] = useState<{ key: number; items: IPlayer[] }[]>([])

  const {
    data: players,
    isError,
    error,
    isFetching,
  } = useQuery<IPlayer[], Error>(
    [`players-${scope}`, scope],
    () => fetchPlayerList(Number(scope)),
    {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      enabled: !!scope,
    },
  )

  const { data: coaches } = useQuery<ICoach[], Error>(
    [`coaches`, scope],
    () => fetchCoaches(),
    {
      refetchOnWindowFocus: false,
      staleTime: 30 * 60 * 1000,
      enabled: Number(scope ?? 0) == 0,
    },
  )

  useEffect(() => {
    if (!coaches && !players) return
    const playerExtra = [1, 2, 3, 4].reduce((acc: any, cur: number) => {
      const newPlayers = players?.filter(player => player.mainPosition === cur)
      if (newPlayers?.length) {
        return [...acc, { key: cur, items: newPlayers }]
      } else return acc
    }, [])
    setData(
      scope && Number(scope) > 0
        ? playerExtra ?? []
        : [{ key: 0, items: coaches }] ?? [],
    )
  }, [coaches, players, scope])

  const posKeyToLabel = (key?: number) => {
    switch (key) {
      case 1:
        return 'Thủ môn'
      case 2:
        return 'Hậu vệ'
      case 3:
        return 'Tiền vệ'
      case 4:
        return 'Tiền đạo'
      default:
        return ''
    }
  }

  if (isError)
    return (
      <Box my={2} textAlign="center">
        <MuiTypography variant="h3">{(error as any).message}</MuiTypography>
      </Box>
    )

  return (
    <>
      {data.length &&
        data.map((pos, index) => (
          <Stack
            key={pos.key}
            gap={3}
            py={6}
            bgcolor={index % 2 !== 0 ? '#F1F3F5' : '#F8F9FA'}
          >
            <Container>
              <Stack gap={3}>
                <MuiTypography variant="h3" color={'secondary'}>
                  {posKeyToLabel(pos.key)}
                </MuiTypography>
                <Grid container spacing={4}>
                  {pos?.items &&
                    pos.items?.length &&
                    pos.items.map(item => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        className="item"
                        key={item.id}
                      >
                        <Link
                          href={`/teams/${item.id}?scope=${scope}`}
                          passHref
                        >
                          <a>
                            <PlayerCard item={item} width={'100%'}>
                              <Stack mt={2.5} gap={0.25}>
                                {scope && Number(scope) == 0 && (
                                  <Typography
                                    variant="subtitle1"
                                    color={'secondary'}
                                    textAlign="start"
                                    sx={{
                                      fontWeight: 500,
                                      color: '#ED1E24',
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    {item.position}
                                  </Typography>
                                )}
                                <Typography
                                  color={'secondary'}
                                  textAlign="start"
                                  sx={{
                                    fontSize: '1.25rem',
                                    lineHeight: 1.5,
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.name}
                                </Typography>
                              </Stack>
                            </PlayerCard>
                          </a>
                        </Link>
                      </Grid>
                    ))}
                </Grid>
              </Stack>
            </Container>
          </Stack>
        ))}

      {isFetching && (
        <Grid container spacing={4}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <SkeletonLoading height={350} aspect={2 / 3} />
              </Grid>
            ))}
        </Grid>
      )}
    </>
  )
}
