import { Box, Breadcrumbs, styled } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

const BreadcrumbRoot = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
}))

const SubName = styled('span')(() => ({
  textTransform: 'uppercase',
  //   color: '#495057',
  fontWeight: 500,
  fontSize: '13px',
}))

export interface IProps {
  textColor?: 'dark' | 'light'
  routeSegments: { name?: string; path?: string }[]
}

export function Breadcrumb({ textColor = 'dark', routeSegments }: IProps) {
  return (
    <BreadcrumbRoot>
      <Breadcrumbs
        separator={
          <Box mt={0.5}>
            <Image
              src={'/assets/images/vuesax/arrow-right-gray.svg'}
              width={16}
              height={16}
              alt=""
              style={{
                filter:
                  textColor === 'dark'
                    ? 'invert(0%) sepia(99%) saturate(15%) hue-rotate(13deg) brightness(94%) contrast(100%)'
                    : 'invert(100%) sepia(100%) saturate(0%) hue-rotate(84deg) brightness(111%) contrast(101%)',
              }}
            />
          </Box>
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Link href="/" passHref>
          <a>
            <SubName
              sx={{ color: textColor === 'dark' ? '#495057' : '#FFFFFF' }}
            >
              Trang chủ
            </SubName>
          </a>
        </Link>

        {routeSegments
          ? routeSegments.map((route, index) => {
              return index !== routeSegments.length - 1 ? (
                <Link key={index} href={route.path ?? ''} passHref>
                  <a>
                    <SubName
                      sx={{
                        color: textColor === 'dark' ? '#495057' : '#FFFFFF',
                      }}
                    >
                      {route.name}
                    </SubName>
                  </a>
                </Link>
              ) : (
                <Link key={index} href={route.path ?? ''} passHref>
                  <a>
                    <SubName
                      key={index}
                      sx={{
                        color: textColor === 'dark' ? '#495057' : '#FFFFFF',
                      }}
                    >
                      {route.name}
                    </SubName>
                  </a>
                </Link>
              )
            })
          : null}
      </Breadcrumbs>
    </BreadcrumbRoot>
  )
}
