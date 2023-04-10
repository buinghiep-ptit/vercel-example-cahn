import { ICatv } from '@/models'
import { INews } from '@/models/news'
import { Box, Button, Grid, styled, Typography } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { HighLightCard } from '../commons/Cards/HighLightCard'
import { TVCard } from '../commons/Cards/TVCard'
import { MediaViewItem } from '../commons/MediaViewItem'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export interface IProps {
  catvs: ICatv[]
}

export function CAHNTV({ catvs }: IProps) {
  return (
    <>
      <Typography variant="h2" color={'secondary'}>
        {'CAHN FC TV'}
      </Typography>
      {catvs?.length ? (
        <Box pt={4} pb={8}>
          <HighLightCard item={catvs[0]} />
        </Box>
      ) : null}
      {/* {catvs?.length ? (
        <Box pt={4} pb={8}>
          <MediaViewItem media={catvs[0]} />
        </Box>
      ) : null} */}
      <Grid container spacing={3}>
        {catvs?.length > 1 &&
          catvs.slice(1, 5).map((item, index) => (
            <Grid item xs={12} sm={4} md={3} className="item" key={item.id}>
              <TVCard item={item} index={index} width="100%" />
            </Grid>
          ))}
      </Grid>
      <JustifyBox mt={4}>
        <Link href={'/videos'} passHref>
          <a>
            <Button
              onClick={() => {}}
              variant="contained"
              sx={{ color: '#FFD200', width: 200, height: 48 }}
            >
              Xem tất cả
            </Button>
          </a>
        </Link>
      </JustifyBox>
    </>
  )
}
