import { ICatv } from '@/models'
import { INews } from '@/models/news'
import { TypeCardToLabel } from '@/utils'
import { Box, Divider, IconButton, Stack, styled } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { LazyNextImage } from '../../LazyNextImage'
import { MuiTypography } from '../../MuiTypography'

export const JustifyBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const ItemContainer = styled(Box)({
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
})

export interface IProps {
  item: ICatv
  index: number
  width?: string
}

export function TVCard({ item, index, width }: IProps) {
  const [hover, setHover] = React.useState(false)
  const [hoverIdx, setHoverIdx] = React.useState(-1)

  const handleOnMouseEnter = (idx: number) => {
    setHoverIdx(idx)
    setHover(true)
  }

  const handleOnMouseLeave = () => {
    setHoverIdx(-1)
    setHover(false)
  }

  return (
    <>
      <ItemContainer gap={1.5} width={width || 300}>
        <Box
          sx={{
            aspectRatio: 'calc(3/2)',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
            borderRadius: '12px',
          }}
        >
          <Box
            width={'100%'}
            height={'100%'}
            onMouseEnter={() => handleOnMouseEnter(index)}
            onMouseLeave={handleOnMouseLeave}
          >
            <Link href={`/videos/${item.id}`} passHref>
              <a>
                <LazyNextImage imgUrl={item.imgUrl} />
              </a>
            </Link>
          </Box>

          <Stack
            direction={'row'}
            gap={1}
            sx={{
              position: 'absolute',
              bottom: 6,
              left: 12,
              alignItems: 'flex-end',
            }}
          >
            <JustifyBox
              sx={{
                bgcolor: hover && hoverIdx === index ? '#FFD200' : 'none',
                borderRadius: 100,
                p: hover && hoverIdx === index ? 1.25 : 0,
                transition: '0.25s ease-in-out',
              }}
            >
              <Image
                src={'/assets/images/vuesax/play.svg'}
                alt="logo 1"
                width={18}
                height={18}
                style={{
                  filter:
                    hover && hoverIdx === index
                      ? 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)'
                      : 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)',
                }}
              />
            </JustifyBox>
            <MuiTypography
              sx={{
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: 1.4,
              }}
            >
              {'01:20'}
            </MuiTypography>
          </Stack>
        </Box>
        <Stack direction={'column'} gap={1}>
          <Link href={`/videos/${item.id}`} passHref>
            <a>
              <MuiTypography
                variant="h5"
                color={'secondary'}
                ellipsis={'ellipsis'}
                sx={{
                  letterSpacing: '1px',
                }}
              >
                {item.title}
              </MuiTypography>
            </a>
          </Link>
        </Stack>

        <Stack
          direction={'row'}
          alignItems="center"
          justifyContent={'space-between'}
          mt={-1}
        >
          <Stack
            direction={'row'}
            alignItems="center"
            gap={1}
            divider={
              <Divider
                orientation="vertical"
                sx={{ background: '#D9D9D9', my: 0.5 }}
                flexItem
              />
            }
          >
            <MuiTypography
              variant="subtitle1"
              sx={{
                fontFamily: 'UTM Bebas',
                color: '#ED1E24',
                fontWeight: 400,
                letterSpacing: '1px',
              }}
            >
              {TypeCardToLabel(item?.type ?? 0)}
            </MuiTypography>
            <MuiTypography
              variant="body2"
              sx={{
                color: '#868E96',
                lineHeight: 1,
                pt: 0.25,
              }}
            >
              {moment(item?.dateUpdated).format('HH:ss, DD/MM/YYYY')}
            </MuiTypography>
          </Stack>
          <IconButton>
            <Image
              src={'/assets/images/vuesax/share.svg'}
              alt="icon"
              width={20}
              height={20}
            />
          </IconButton>
        </Stack>
      </ItemContainer>
    </>
  )
}
