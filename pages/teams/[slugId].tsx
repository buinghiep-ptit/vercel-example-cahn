import { Breadcrumb } from '@/components/commons/Breadcrumb'
import { PlayerDetail } from '@/components/teams/player'
import { PrimaryLayout } from '@/layouts'
import { Box, Container } from '@mui/material'
import { useRouter } from 'next/router'
import * as React from 'react'

export interface IPlayerDetailProps {}

function PlayerDetailPage(props: IPlayerDetailProps) {
  const router = useRouter()
  const { scope } = router.query

  return (
    <Box sx={{ pt: 14, bgcolor: '#F8F9FA' }}>
      <Container sx={{ py: 3 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Video', path: '/teams' },
            {
              name: scope && Number(scope) > 0 ? 'Cầu thủ' : 'Ban huấn luyện',
            },
          ]}
        />
      </Container>
      <PlayerDetail />
    </Box>
  )
}
export default PlayerDetailPage
PlayerDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}
