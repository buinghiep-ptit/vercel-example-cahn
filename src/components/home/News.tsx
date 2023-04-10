import { INews } from '@/models/news'
import { Box, Button, styled } from '@mui/material'
import Link from 'next/link'
import * as React from 'react'
import { NewsCard } from '../commons/Cards/NewsCard'
import { MUICarousel } from '../commons/MUICarousel'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export interface IProps {
  newsList?: INews[]
}

export function News({ newsList }: IProps) {
  const [items] = React.useState<INews[]>(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/news-card-${
          Math.floor(Math.random() * 2) + 1
        }.jpg`,
        type: Math.floor(Math.random() * 3) + 1,
        title:
          'DANH SÁCH THAM DỰ U23 CUP – DOHA QATAR 2023: 5 SAO TRẺ CỦA CÔNG AN HẢI DƯƠNG CITY',
        shortDescription:
          'Chiều ngày 16.3, liên đoàn bóng đá Việt Nam đã công bố Ronaldo về MU',
        datePublished: '2023-03-12T16:59:59.999Z',
      })),
  )

  return (
    <>
      <MUICarousel title="Tin tức" titleColor="dark">
        <>
          {newsList?.length &&
            newsList.map((news, index) => (
              <div className="item" key={index}>
                <NewsCard item={news} />
              </div>
            ))}
        </>
      </MUICarousel>
      <JustifyBox>
        <Link href={'/news'} passHref>
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
