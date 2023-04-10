import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import * as React from 'react'

export interface Props {
  height?: number
  aspect?: number
}

export function SkeletonLoading({ height, aspect = 3 / 2 }: Props) {
  return (
    <Stack
      gap={2}
      sx={{ width: '100%' }}
      direction={'column'}
      height={height || 250}
    >
      <Box
        sx={{
          aspectRatio: `calc(${aspect})`,
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          borderRadius: '12px',
        }}
        className="skeleton"
      />

      <Stack gap={1} width={'100%'}>
        <Box
          sx={{
            borderRadius: '4px',
            width: '100%',
            height: 24,
          }}
          className="skeleton"
        />
        <Stack direction={'row'} gap={3}>
          <Stack direction={'row'} gap={1} flex={1}>
            <Box
              sx={{
                borderRadius: '4px',
                height: 16,
                width: 60,
              }}
              className="skeleton"
            />
            <Box
              sx={{
                borderRadius: '4px',
                height: 16,
                flex: 1,
              }}
              className="skeleton"
            />
          </Stack>
          <Box
            sx={{
              borderRadius: '4px',
              height: 16,
              width: 40,
            }}
            className="skeleton"
          />
        </Stack>
      </Stack>
    </Stack>
  )
}
