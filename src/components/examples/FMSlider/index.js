import { Box, Container, Stack } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export function FMSlider() {
  const [[activeIndex, direction], setActiveIndex] = useState([1, 0])
  const items = ['🍔', '🍕', '🌭', '🍗']

  // we want the scope to be always to be in the scope of the array so that the carousel is endless
  const indexInArrayScope =
    ((activeIndex % items.length) + items.length) % items.length

  // so that the carousel is endless, we need to repeat the items twice
  // then, we slice the the array so that we only have 3 items visible at the same time
  const visibleItems = [...items, ...items].slice(
    indexInArrayScope,
    indexInArrayScope + 3,
  )

  const handleClick = newDirection => {
    setActiveIndex(prevIndex => [prevIndex[0] + newDirection, newDirection])
  }

  return (
    <div className="main-wrapper">
      <div className="wrapper">
        {/*AnimatePresence is necessary to show the items after they are deleted because only max. 3 are shown*/}
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleItems.map((item, index) => {
            // The layout prop makes the elements change its position as soon as a new one is added
            // The key tells framer-motion that the elements changed its position
            return (
              <motion.div
                className="card"
                key={item}
                layout
                custom={{
                  direction,
                  position: () => {
                    if (item === visibleItems[0]) {
                      return 'left'
                    } else if (item === visibleItems[1]) {
                      return 'center'
                    } else {
                      return 'right'
                    }
                  },
                }}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 1 }}
              >
                <Box
                  sx={{
                    background:
                      index !== 1
                        ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/images/integrate-fpl.jpg)'
                        : 'url(/assets/images/integrate-fpl.jpg)',
                    overflow: 'hidden',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    borderRadius: '16px',
                  }}
                  width="100%"
                  height={'100%'}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <Container
        sx={{
          position: 'absolute',
          top: '50%',
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 9,
        }}
      >
        <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
          <motion.button
            style={{
              padding: '4px',
              backgroundColor:
                activeIndex < 1 ? 'rgba(255, 255, 255, 0.24)' : '#FFFFFF',
              borderRadius: 100,
              display: 'flex',
              border: 'none',
              marginLeft: '-20px',
            }}
            whileTap={{ scale: 0.8 }}
            onClick={() => activeIndex >= 1 && handleClick(-1)}
          >
            <Image
              src={'/assets/images/vuesax/arrow-left.svg'}
              width={24}
              height={24}
              style={{
                filter:
                  activeIndex < 1
                    ? 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)'
                    : 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
              }}
            />
          </motion.button>
          <motion.button
            style={{
              padding: '4px',
              backgroundColor:
                activeIndex === items.length - 1
                  ? 'rgba(255, 255, 255, 0.24)'
                  : '#FFFFFF',
              borderRadius: 100,
              display: 'flex',
              border: 'none',
              marginRight: '-20px',
            }}
            whileTap={{ scale: 0.8 }}
            onClick={() => activeIndex < items.length - 1 && handleClick(1)}
          >
            <Image
              src={'/assets/images/vuesax/arrow-right.svg'}
              width={24}
              style={{
                filter:
                  activeIndex < items.length - 1
                    ? 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)'
                    : 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
              }}
              height={24}
            />
          </motion.button>
        </Stack>
      </Container>

      <Stack direction={'row'} gap={1} mt={4}>
        {items.map((_, index) => (
          <Box
            key={index}
            width={24}
            height={4}
            borderRadius={100}
            bgcolor={activeIndex === index ? '#FFFFFF' : '#CCCCCC'}
            zIndex={9}
          ></Box>
        ))}
      </Stack>
    </div>
  )
}

const variants = {
  enter: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? 50 : -50, opacity: 0 }
  },
  center: ({ position, direction }) => {
    return {
      scale: position() === 'center' ? 1.015 : 0.96,
      x: 0,
      zIndex: getZIndex({ position, direction }),
      opacity: 1,
    }
  },
  exit: ({ direction }) => {
    return { scale: 0.2, x: direction < 1 ? -50 : 50, opacity: 0 }
  },
}

function getZIndex({ position, direction }) {
  const indexes = {
    left: direction > 0 ? 2 : 1,
    center: 3,
    right: direction > 0 ? 1 : 2,
  }
  return indexes[position()]
}
