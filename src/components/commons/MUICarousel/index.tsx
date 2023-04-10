import { Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import * as React from 'react'

export interface Props<T> {
  items?: T[]
  title?: string
  titleColor?: 'light' | 'dark'
  fontSizeTitle?: 'medium' | 'large'
  children?: React.ReactElement
}

export function MUICarousel<T>({
  items,
  titleColor,
  title,
  children,
  fontSizeTitle = 'large',
}: Props<T>) {
  const cRef = React.useRef(null)
  const carousel = React.useRef(null)
  const [w, setW] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [dotsLen, setDotsLen] = React.useState(0)

  React.useEffect(() => {
    const x = (cRef as any).current.offsetWidth
    setDotsLen(Math.ceil((carousel as any).current.scrollWidth / x))
    const offsetEdge = window.innerWidth - x
    setW(window.innerWidth - offsetEdge / 2)
  }, [cRef, carousel])

  React.useEffect(() => {
    const handleResize = () => {
      ;(carousel as any).current.scrollLeft = 0
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLeftClick = (e: any) => {
    e.preventDefault()
    ;(carousel as any).current.scrollLeft -= (
      carousel as any
    ).current.offsetWidth
    if (activeIndex > 0) setActiveIndex(activeIndex - 1)
  }

  const handleRightClick = (e: any) => {
    e.preventDefault()
    ;(carousel as any).current.scrollLeft += (
      carousel as any
    ).current.offsetWidth
    if (activeIndex < dotsLen - 1) setActiveIndex(activeIndex + 1)
  }

  return (
    <Stack gap={fontSizeTitle === 'large' ? 4 : 3}>
      <Stack
        direction={'row'}
        justifyContent="space-between"
        alignItems={'center'}
      >
        <Typography
          variant={fontSizeTitle === 'large' ? 'h2' : 'h4'}
          color={titleColor === 'light' ? 'primary' : 'secondary'}
        >
          {title}
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
          <motion.button
            style={{
              padding: '8px',
              backgroundColor: activeIndex > 0 ? '#212529' : '#E9ECEF',
              borderRadius: 100,
              display: 'flex',
              border: 'none',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.8 }}
            onClick={e => handleLeftClick(e)}
          >
            <Image
              src={'/assets/images/vuesax/arrow-left.svg'}
              width={24}
              height={24}
              style={{
                filter:
                  activeIndex > 0
                    ? 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)'
                    : 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
              }}
              alt="icon"
            />
          </motion.button>
          <motion.button
            style={{
              padding: '8px',
              backgroundColor:
                activeIndex < dotsLen - 1 ? '#212529' : '#E9ECEF',
              borderRadius: 100,
              display: 'flex',
              border: 'none',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.8 }}
            onClick={e => handleRightClick(e)}
          >
            <Image
              src={'/assets/images/vuesax/arrow-right.svg'}
              width={24}
              height={24}
              style={{
                filter:
                  activeIndex < dotsLen - 1
                    ? 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)'
                    : 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
              }}
              alt="icon"
            />
          </motion.button>
        </Stack>
      </Stack>
      <div className="container" ref={cRef} style={{ width: w || '100%' }}>
        <Stack direction={'row'} className="carousel" ref={carousel}>
          {children}
        </Stack>
      </div>

      <Stack
        direction={'row'}
        display={{ xs: 'none', md: 'flex' }}
        gap={1}
        justifyContent="center"
      >
        {Array(dotsLen)
          .fill(0)
          .map((_, idx) => (
            <Box
              sx={{
                opacity: idx === activeIndex ? 1 : 0.5,
                transition: '0.5s ease-in-out',
                cursor: 'pointer',
              }}
              key={idx}
              width={24}
              height={2}
              borderRadius={100}
              bgcolor={'#FFFFFF'}
              zIndex={9}
            ></Box>
          ))}
      </Stack>
    </Stack>
  )
}
