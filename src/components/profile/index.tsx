import { logOut } from '@/api-client'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
} from '@mui/material'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Breadcrumb } from '../commons/Breadcrumb'
import { MuiTypography } from '../commons/MuiTypography'

export interface IProps {}

export function Profile(props: IProps) {
  const router = useRouter()
  const listRoutes = [
    {
      name: 'Thông tin tài khoản',
      path: '/profile/account-info',
      icon: '/assets/images/vuesax/profile-circle.svg',
    },
    {
      name: 'Lịch sử mua hàng',
      path: '/profile/order-history',
      icon: '/assets/images/vuesax/bag-timer.svg',
    },
    {
      name: 'Đổi mật khẩu',
      path: '/profile/change-password',
      icon: '/assets/images/vuesax/lock.svg',
    },
  ]

  const handleLogout = async (e: any) => {
    e.preventDefault()
    try {
      await logOut()
      await signOut({ redirect: false })
      router.push(process.env.NEXT_PUBLIC_APP_URL ?? 'https://cahn.campdi.vn/')
    } catch (error) {}
  }

  return (
    <Box
      sx={{
        pt: 14,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: 'url(/assets/images/profile/bg-profile.jpg)',
        minHeight: '100vh',
      }}
    >
      <Container sx={{ py: 2 }}>
        <Breadcrumb routeSegments={[{ name: 'Tài khoản' }]} />
        <Box
          sx={{ borderRadius: 4, bgcolor: '#FFFFFF', py: 6, px: 9.5, my: 10 }}
        >
          <Stack
            gap={5}
            divider={
              <Divider
                orientation="horizontal"
                sx={{ background: '#E9ECEF' }}
                flexItem
              />
            }
          >
            <Stack direction={'row'} gap={4}>
              <Box
                position={'relative'}
                sx={{
                  width: 104,
                  height: 104,
                }}
              >
                <Avatar
                  alt="avatar"
                  src={'/assets/images/common/avatar-default.jpeg'}
                  sx={{
                    width: 104,
                    height: 104,
                  }}
                />
                <IconButton
                  sx={{ position: 'absolute', bottom: -8, right: -8 }}
                >
                  <Avatar
                    alt="avatar"
                    src={'/assets/images/vuesax/camera.svg'}
                    sx={{
                      width: 32,
                      height: 32,
                      p: 0.75,
                      bgcolor: '#F1F3F5',
                      border: '1px solid #FFFFFF',
                      backdropFilter: 'blur(2px)',
                    }}
                  />
                </IconButton>
              </Box>

              <Stack gap={1} alignItems="flex-start">
                <MuiTypography
                  variant="h5"
                  color="secondary"
                  letterSpacing={'1px'}
                >
                  Xin chào!
                </MuiTypography>
                <MuiTypography
                  sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.5 }}
                  color="secondary"
                >
                  Nguyễn Đức Thành
                </MuiTypography>

                <MuiTypography
                  variant="h6"
                  sx={{
                    fontSize: '1rem',
                    bgcolor: '#ED1E24',
                    px: 1.5,
                    pt: 0.5,
                    pb: 1,
                    borderRadius: 2,
                  }}
                >
                  ID MEMBER: 123456
                </MuiTypography>
              </Stack>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent="space-between"
              alignItems={'flex-end'}
            >
              <Stack gap={3}>
                {listRoutes.map((item, index) => (
                  <Link key={index} href={item.path} passHref>
                    <a>
                      <Stack gap={1.5} alignItems="center" direction={'row'}>
                        <Image src={item.icon} width={24} height={24} alt="" />
                        <MuiTypography
                          variant="body1"
                          fontWeight={500}
                          color="secondary"
                          pt={0.5}
                        >
                          {item.name}
                        </MuiTypography>
                      </Stack>
                    </a>
                  </Link>
                ))}
              </Stack>

              <Stack
                gap={1}
                direction={'row'}
                alignItems="flex-end"
                divider={
                  <Divider
                    orientation="vertical"
                    sx={{ background: '#E9ECEF', my: 0.5 }}
                    flexItem
                  />
                }
              >
                <Button
                  variant="text"
                  onClick={() => router.push('/profile/delete-account')}
                >
                  <MuiTypography
                    variant="body1"
                    fontWeight={500}
                    fontSize={'0.9375rem'}
                    color="secondary.light"
                  >
                    {'Xóa tài khoản'}
                  </MuiTypography>
                </Button>
                <Button variant="text" onClick={e => handleLogout(e)}>
                  <MuiTypography
                    variant="body1"
                    fontWeight={500}
                    fontSize={'0.9375rem'}
                    color="secondary.light"
                  >
                    {'Đăng xuất'}
                  </MuiTypography>
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
