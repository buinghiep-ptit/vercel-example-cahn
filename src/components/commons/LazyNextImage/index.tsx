import styled from '@emotion/styled'
import { Box } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const Wrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '100%',
  cursor: 'pointer',
})

const Img = styled('img')(({ loaded, ishover }: any) => ({
  transform: ishover ? 'scale(1.05)' : 'scale(1)',
  opacity: loaded ? 1 : 0,
  transition: ishover ? 'transform 0.3s ease' : 'opacity 0.5s ease-in-out',
}))

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  // backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
})

export interface IProps {
  imgUrl?: string
  canHover?: boolean
  canOverlay?: boolean
  defaultOverlay?: boolean
}

export const LazyNextImage = ({
  imgUrl,
  canHover = true,
  canOverlay = true,
  defaultOverlay = false,
}: IProps) => {
  const [loading, setLoading] = useState(true)
  const [hover, setHover] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const handleOnLoad = () => {
    setLoading(false)
  }

  const handleOnMouseEnter = () => {
    setShowOverlay(true)
    setHover(true)
  }

  const handleOnMouseLeave = () => {
    setHover(false)
    setShowOverlay(false)
  }

  return (
    <Wrapper
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {loading && (
        <Overlay className="skeleton">
          <span>Đang tải...</span>
        </Overlay>
      )}
      <Img
        src={imgUrl ?? '/assets/images/common/img-default.jpeg'}
        alt={'img lazy'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        loaded={loading ? 0 : 1}
        ishover={canHover && hover ? 1 : 0}
        onLoad={handleOnLoad}
      />
      {((canOverlay && showOverlay && canHover && !loading) ||
        defaultOverlay) && <div className="overlay"></div>}
    </Wrapper>
  )
}
