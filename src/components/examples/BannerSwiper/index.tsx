import React from 'react'
import Slider from 'react-slick'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export interface Props {}

const BoxContent = styled(Box)({
  position: 'relative',
  textAlign: 'center',
  paddingTop: '47.86%',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderRadius: '16px',
  filter: 'drop-shadow(0px 25px 50px rgba(0, 0, 0, 0.32))',
  //   marginLeft: '135px',
})

const CarouselContainer = styled(Box)({
  width: '100%',
  height: 'auto',
  margin: '0 auto',
  backgroundColor: '#ED1E24',
  zIndex: 9999,
  '& .slick-slide': {
    color: '#fff',
    // padding: '36px',
    '@media screen and (max-width: 1440px)': {
      padding: '8px',
    },
    '@media screen and (max-width: 900px)': {
      padding: '24px',
    },
    '@media screen and (max-width: 768px)': {
      padding: '20px',
    },
    '@media screen and (max-width: 400px)': {
      padding: '10px',
    },
  },
  '& .slick-center': {
    zIndex: 999,
    transition: '0.2s ease-in-out',
    WebkitTransform: 'scale(1.077)',
    MozTransform: 'scale(1.077)',
    transform: 'scale(1.077)',
  },
  '& .slick-prev, & .slick-next': {
    zIndex: 1,
    color: '#fff',
  },
  '& .slick-prev': {
    left: 0,
  },
  '& .slick-next': {
    right: 0,
  },
  '& .slick-prev:before, & .slick-next:before': {
    fontSize: '36px',
    lineHeight: '1',
  },
  '& .slick-dots': {
    bottom: '-40px',
    '& li button:before': {
      fontSize: '12px',
      color: '#fff',
      opacity: '0.5',
    },
    '& .slick-active button:before': {
      opacity: '1',
    },
  },
})

export function Swiper(props: Props) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // centerMode: true,
    // centerPadding: '10.5%',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          //   centerPadding: '4%',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          //   centerPadding: '8%',
        },
      },
    ],
  }
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {Array(11)
          .fill(0)
          .map(num => (
            <BoxContent
              key={num}
              sx={{
                backgroundImage: 'url(/assets/images/card-img-2.jpg)',
              }}
              className="content"
            />
          ))}
      </Slider>
    </CarouselContainer>
  )
}
