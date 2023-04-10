import { Seo } from '@/components/commons/seo'
import { Footer } from '@/components/layouts'
import { HeaderNavbar } from '@/components/layouts/header'
import { Box } from '@mui/system'
import * as React from 'react'

export interface IDefaultLayoutProps {
  children?: React.ReactElement
  isChangeColorHeader?: boolean
}

function Loading() {
  return <div>Loading...</div>
}

export function PrimaryLayout({
  children,
  isChangeColorHeader = true,
}: IDefaultLayoutProps) {
  return (
    <React.Suspense fallback={<Loading />}>
      <Seo title="CAHNFC | Trang bóng đá số 1 Việt Nam" />
      <Box
        minHeight="100vh"
        sx={{ overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        <HeaderNavbar
          brand="CAHNFC"
          rightLinks={true}
          leftLink={true}
          fixed
          color="transparent"
          changeColorOnScroll={
            isChangeColorHeader
              ? {
                  height: 100,
                  color: 'white',
                }
              : undefined
          }
        />
        <Box component="main" flexGrow={1}>
          {children}
        </Box>
        <Footer />
      </Box>
    </React.Suspense>
  )
}
