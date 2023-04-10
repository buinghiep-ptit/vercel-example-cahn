import * as React from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { Box } from '@mui/material'

export interface IFMCarouselProps {}

function FMCarousel(props: IFMCarouselProps) {
  const [w, setW] = React.useState(0)
  const carouselRef = React.useRef(null)
  const [position, setPosition] = React.useState(0)
  React.useEffect(() => {
    setW(
      (carouselRef as any).current.scrollWidth -
        (carouselRef as any).current.offsetWidth,
    )
  }, [])

  return (
    <Box>
      {/* <Box position={'absolute'} top={100}>
        <button onClick={() => setPosition(position - 1)}>-</button>
        <button onClick={() => setPosition(position + 1)}>+</button>
      </Box>
      <div className="row">
        {Array(6)
          .fill(0)
          .map((num, index) => (
            <motion.div
              key={index}
              className="container"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                rotate: 0,
                left: `${(index - position) * 50 - 50}vw`,
                scale: index === position ? 1 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              //   style={{ paddingRight: '48px' }}
            >
              <img src="/assets/images/integrate-fpl.jpg" />
            </motion.div>
          ))} */}

      <motion.div className="carousel" ref={carouselRef} whileTap={'grabbing'}>
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -w }}
          className="inner-carousel"
        >
          {Array(6)
            .fill(0)
            .map((num, index) => {
              return (
                <motion.div
                  className="item"
                  key={num}
                  animate={{}}
                  style={{ paddingRight: index === 5 ? '0' : '24px' }}
                >
                  <img src="/assets/images/integrate-fpl.jpg" />
                </motion.div>
              )
            })}
        </motion.div>
      </motion.div>
      {/* </div> */}
      <Box>
        <button onClick={() => setPosition(position - 1)}>-</button>
        <button onClick={() => setPosition(position + 1)}>+</button>
      </Box>
    </Box>
  )
}

const translateXForElement = (element: any) => {
  const transform = element.style.transform

  if (!transform || transform.indexOf('translateX(') < 0) {
    return 0
  }

  const extractTranslateX = transform.match(/translateX\((-?\d+)/)

  return extractTranslateX && extractTranslateX.length === 2
    ? parseInt(extractTranslateX[1], 10)
    : 0
}

export const HorizontalScroll = ({ children }: any) => {
  const dragRef = React.useRef(null)
  const imgRef = React.useRef(null)

  const animation = useAnimation()
  const [w, setW] = React.useState(0)
  const [img, setImg] = React.useState(0)
  const [position, setPosition] = React.useState(0)
  React.useEffect(() => {
    setW(
      (dragRef as any).current.scrollWidth -
        (dragRef as any).current.offsetWidth,
    )
    setImg((imgRef as any).current.offsetWidth)
  }, [])

  function onLeftClick() {
    const xPos = translateXForElement(dragRef.current)
    const newXPosition = xPos + img + 20

    animation.start({
      x: newXPosition > 0 ? 0 : newXPosition,
    })
    console.log((dragRef as any).current.offsetWidth)
    // ;(
    //   dragRef as any,
    // ).current.scrollLeft -= 100
  }

  function onRightClick() {
    const xPos = translateXForElement(dragRef.current)
    console.log('r:', xPos)

    const newXPosition = xPos - img - 20
    console.log(-w, newXPosition - 840 - 1)

    animation.start({
      x:
        newXPosition - ((img + 20) * 1 + 1) < -w
          ? -w + (img + 20) * 1
          : newXPosition,
    })
  }

  return (
    <>
      <button type="button" onClick={onLeftClick}>
        Left
      </button>

      <motion.div
        // drag="x"
        // dragConstraints={{ left: -w, right: 0 }}
        initial={false}
        animate={animation}
        style={{ width: w, x: 0, opacity: 1, display: 'flex' }}
        ref={dragRef}
      >
        {Array(8)
          .fill(0)
          .map((_, index) => {
            return (
              <motion.div
                key={index}
                animate={{}}
                style={{ paddingRight: '20px' }}
              >
                <img
                  ref={imgRef}
                  src="/assets/images/integrate-fpl.jpg"
                  width={350}
                  height={100}
                />
              </motion.div>
            )
          })}
      </motion.div>

      <button type="button" onClick={onRightClick}>
        Right
      </button>
    </>
  )
}
