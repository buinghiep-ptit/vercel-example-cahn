import { INews } from '@/models/news'
import { TypeCardToLabel } from '@/utils'
import { Box, Divider, IconButton, Stack, styled } from '@mui/material'
import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
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
})

export interface IProps {
  item: INews
  width?: number | string
}

export function NewsCard({ width, item }: IProps) {
  return (
    <div>
      <ItemContainer width={width || 300} gap={1.5}>
        <Link href={`/news/${item.id}`} passHref>
          <a>
            <Box
              sx={{
                aspectRatio: 'calc(3/2)',
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                borderRadius: '12px',
              }}
            >
              <LazyNextImage imgUrl={item.imgUrl} />
            </Box>
          </a>
        </Link>

        <Stack direction={'column'} gap={1}>
          <Link href={`/news/${item.id}`} passHref>
            <a>
              <MuiTypography
                variant="h5"
                color={'secondary'}
                ellipsis={'ellipsis'}
              >
                {item.title}
              </MuiTypography>
            </a>
          </Link>
          <MuiTypography
            variant="body2"
            color={'secondary'}
            ellipsis={'ellipsis'}
          >
            {item.description}
          </MuiTypography>
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
              {TypeCardToLabel(item.type ?? 0)}
            </MuiTypography>
            <MuiTypography
              variant="body2"
              sx={{
                color: '#868E96',
                lineHeight: 1,
                pt: 0.25,
              }}
            >
              {moment(item.datePublished).format('HH:ss, DD/MM/YYYY')}
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
    </div>
  )
}
