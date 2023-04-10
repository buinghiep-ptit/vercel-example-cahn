import { IProduct } from '@/models/product'
import { CurrencyFormatter } from '@/utils'
import { Box, Container, Stack, styled, Typography } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { LazyNextImage } from '../commons/LazyNextImage'
import { MUICarousel } from '../commons/MUICarousel'

const ItemContainer = styled(Box)<IProps>({
  borderRadius: '12px',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
})

export interface IProps {
  products?: IProduct[]
}

export function Products({ products }: IProps) {
  const [items] = React.useState<IProduct[]>(
    Array(11)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        thumb: `/assets/images/home/product-card.jpg`,
        type: 0,
        shortDescription: 'Áo đấu chính thức Câu Lạc Bộ Công An Hà Nội',
        price: 259000,
      })),
  )

  const renderItem = (item: IProduct) => {
    return (
      <ItemContainer maxWidth={300} minWidth={300}>
        <Box
          sx={{
            aspectRatio: 'calc(5/6)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <LazyNextImage
            imgUrl={!!item?.imgUrl?.length ? item?.imgUrl[0] : undefined}
          />
        </Box>
        <Stack direction={'column'} px={2.5} py={2}>
          <Typography
            variant="body1"
            fontWeight={500}
            color={'secondary'}
            textAlign="start"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              whiteSpace: 'normal',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              // wordBreak: 'break-all',
            }}
          >
            {item.description}
          </Typography>

          <Stack
            direction={'row'}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              color={'secondary'}
              sx={{
                letterSpacing: '1px',
              }}
            >
              {CurrencyFormatter(item.basePrice ?? 0)} VNĐ
            </Typography>
            <Image
              src={'/assets/images/vuesax/add-circle.svg'}
              alt="logo 1"
              width={36}
              height={36}
            />
          </Stack>
        </Stack>
      </ItemContainer>
    )
  }

  return (
    <div>
      <Box
        pt={8}
        pb={6}
        sx={{
          textAlign: 'center',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/home/bg-product.jpg)',
        }}
      >
        <Container>
          <MUICarousel title="Sản phẩm" titleColor="light">
            <>
              {products?.length &&
                products.map((item, index) => (
                  <div className="item" key={item.id}>
                    {renderItem(item)}
                  </div>
                ))}
            </>
          </MUICarousel>
        </Container>
      </Box>
    </div>
  )
}
