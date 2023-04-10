import { fetchDataHome } from '@/api-client'
import { IDonor } from '@/models/donor'
import { Box, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { Sponsor } from '../home/Sponsor'

export interface IFooterProps {}

export function Footer(props: IFooterProps) {
  const { data: donors } = useQuery<IDonor[], Error>(
    ['donors'],
    () => fetchDataHome('donors'),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  )
  const socialLogos = [
    {
      iconUrl: '/assets/images/social/facebook.svg',
      href: '',
    },
    {
      iconUrl: '/assets/images/social/youtube.svg',
      href: '',
    },
    {
      iconUrl: '/assets/images/social/instagram.svg',
      href: '',
    },
    {
      iconUrl: '/assets/images/social/tiktok.svg',
      href: '',
    },
  ]
  return (
    <>
      {donors?.length && <Sponsor donors={donors as IDonor[]} />}
      <Box pt={6} pb={16}>
        <Container>
          <Stack
            gap={4}
            divider={
              <Divider
                orientation="horizontal"
                sx={{ background: '#DEE2E6' }}
                flexItem
              />
            }
          >
            <Stack direction={'row'} justifyContent="space-between">
              <Stack direction={'row'} alignItems="center" gap={3}>
                <Image
                  src="/assets/images/logo-border.svg"
                  width={80}
                  height={80}
                  alt=""
                />
                <Typography variant="h4" color={'secondary'}>
                  Công an hà nội fc
                </Typography>
              </Stack>

              <Box>
                <Typography variant="subtitle1" color={'secondary'}>
                  Cộng đồng
                </Typography>
                <Stack direction={'row'} alignItems="center" gap={2} mt={2}>
                  {socialLogos.map((item, index) => (
                    <Link key={index} href={item.href} passHref>
                      <a>
                        <Image
                          src={item.iconUrl}
                          width={36}
                          height={36}
                          alt="social"
                        />
                      </a>
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Stack>
            <Grid container>
              <Grid xs={6} item>
                <Stack gap={2.5}>
                  <Typography
                    variant="subtitle1"
                    fontSize={'1.125rem'}
                    color={'secondary'}
                  >
                    Liên hệ
                  </Typography>

                  <Stack direction={'row'} alignItems="center" gap={1.5}>
                    <Image
                      src={'/assets/images/vuesax/location.svg'}
                      width={24}
                      height={24}
                      alt="social"
                    />
                    <Typography
                      variant="subtitle1"
                      fontSize={'1rem'}
                      fontWeight={400}
                      color={'secondary'}
                    >
                      Số 79 Trần Hưng Đạo, quận Hoàn Kiếm, thành phố Hà Nội
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems="center" gap={1.5}>
                    <Image
                      src={'/assets/images/vuesax/call.svg'}
                      width={24}
                      height={24}
                      alt="social"
                    />
                    <Typography
                      variant="subtitle1"
                      fontSize={'1rem'}
                      fontWeight={400}
                      color={'secondary'}
                    >
                      +84 988 808 296
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} alignItems="center" gap={1.5}>
                    <Image
                      src={'/assets/images/vuesax/sms.svg'}
                      width={24}
                      height={24}
                      alt="social"
                    />
                    <Typography
                      variant="subtitle1"
                      fontSize={'1rem'}
                      fontWeight={400}
                      color={'secondary'}
                    >
                      info@cahnfc.com
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={4} item>
                <Stack gap={2.5}>
                  <Typography
                    variant="subtitle1"
                    fontSize={'1.125rem'}
                    color={'secondary'}
                  >
                    Chính sách
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontSize={'1rem'}
                    fontWeight={400}
                    color={'secondary'}
                  >
                    Chính sách bảo mật
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontSize={'1rem'}
                    fontWeight={400}
                    color={'secondary'}
                  >
                    Điều khoản sử dụng
                  </Typography>
                </Stack>
              </Grid>
              <Grid xs={2} item>
                <Stack gap={2.5}>
                  <Typography
                    variant="subtitle1"
                    fontSize={'1.125rem'}
                    color={'secondary'}
                  >
                    Tải ứng dụng
                  </Typography>
                  <Image
                    src={'/assets/images/qr-chplay.svg'}
                    width={192}
                    height={56}
                    alt="social"
                  />
                  <Image
                    src={'/assets/images/qr-appstore.svg'}
                    width={192}
                    height={56}
                    alt="social"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  )
}
