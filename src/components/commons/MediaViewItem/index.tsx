import { ICatv } from '@/models'
import { Box, BoxProps } from '@mui/system'
import Image from 'next/image'
import * as React from 'react'
import { JustifyBox } from '../Cards/TVCard'
import { LazyNextImage } from '../LazyNextImage'
import MediaPlayer from './MediaPlayer'

export interface IMediaViewItemProps extends BoxProps {
  media: ICatv
  orientation?: 'vertical' | 'horizontal'
}

export function MediaViewItem({
  media,
  orientation = 'horizontal',
  ...props
}: IMediaViewItemProps) {
  const [hover, setHover] = React.useState(false)
  const { imgUrl, url } = media
  const hasVideo = !!url
  const showVideo = hasVideo && hover

  const handleMouseEnter = (e: any) => {
    setHover(true)
  }

  const handleMouseLeave = (e: any) => {
    setHover(false)
  }

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        backgroundSize: 'cover',
        cursor: 'pointer',
        overflow: 'hidden',
        aspectRatio:
          orientation === 'horizontal' ? 'auto 16 / 9' : 'auto 9 / 16', // 56.25% <=> 1280 x 720

        boxShadow: '0px 16px 32px rgba(0, 0, 0, 0.08)',
        borderRadius: '16px',
      }}
      {...props}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
        }}
      >
        <Box
          bgcolor="black"
          sx={{
            overflow: 'hidden',
            position: 'relative',
            backgroundSize: 'cover',
            // borderRadius: '8px',
            // aspectRatio: 'auto 56 / 100',
            width: '100%',
            height: '100%',
          }}
        >
          <LazyNextImage
            imgUrl="https://topicanative.edu.vn/wp-content/uploads/2020/08/ball1-e1596267757599.jpg"
            canHover={false}
          />
          {hasVideo ? (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
              }}
            >
              <JustifyBox
                sx={{
                  bgcolor: '#FFD200',
                  borderRadius: 100,
                  p: 1.25,
                  transition: '0.25s ease-in-out',
                }}
              >
                <Image
                  src={'/assets/images/vuesax/play.svg'}
                  alt="logo 1"
                  width={18}
                  height={18}
                  style={{
                    filter: true
                      ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)'
                      : 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)',
                  }}
                />
              </JustifyBox>
            </Box>
          ) : (
            <div></div>
          )}
          {showVideo && (
            <MediaPlayer
              url={'https://www.youtube.com/watch?v=qYhAPtdDiXs'}
              isPlaying={showVideo}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}
