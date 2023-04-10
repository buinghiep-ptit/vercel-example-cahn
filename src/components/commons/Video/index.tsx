import { Stack } from '@mui/material'
import * as React from 'react'
import { VideoPlayer } from '../VideoPlayer'

export interface IVideoProps {
  mediaUrl: string
}

export function Video({ mediaUrl }: IVideoProps) {
  const [video, setVideo] = React.useState<any>(null)
  React.useEffect(() => {
    setVideo(<VideoPlayer url={mediaUrl} />)
  }, [mediaUrl])
  return (
    <Stack
      sx={{
        position: 'relative',
        aspectRatio: 'auto 16 / 9 ',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
      }}
    >
      {video}
    </Stack>
  )
}
