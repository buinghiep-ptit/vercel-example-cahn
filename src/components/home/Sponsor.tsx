import { IDonor } from '@/models/donor'
import { Box, Stack } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { JustifyBox } from './CAHNTV'

export interface IProps {
  donors: IDonor[]
}

export function Sponsor({ donors }: IProps) {
  return (
    <JustifyBox
      bgcolor={'#BD0F14'}
      flexDirection="column"
      gap={1}
      py={6}
      px={2}
    >
      <Stack gap={3} direction="row">
        {donors.length &&
          donors.slice(0, 3).map((item: IDonor) => (
            <Box key={item.id} width={200} height={72}>
              <LazyNextImage
                imgUrl={
                  item.logo ?? '/assets/images/common/sponsor-default.jpeg'
                }
                canHover={false}
              />
            </Box>
          ))}
      </Stack>
      {donors.length > 3 && (
        <Stack gap={3} direction="row">
          {donors.slice(3).map(item => (
            <Image
              key={item.id}
              width={200 ?? 'item.width'}
              height={72 ?? 'item.height'}
              src={item.logo ?? '/assets/images/vuesax/logo-vna.svg'}
              alt="logo"
            />
          ))}
        </Stack>
      )}
    </JustifyBox>
  )
}
