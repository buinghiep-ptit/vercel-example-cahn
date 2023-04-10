import { Box, Container, IconButton, Stack } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import { MuiTypography } from '../commons/MuiTypography'
import { PopupNotification } from '../commons/PopupNotification'
import { JustifyBox } from '../home/CAHNTV'

export interface IProps {
  children?: React.ReactElement
  title?: string
  callback?: () => void
  errorMsg?: string
  handleClosePopup?: () => void
}

export function AuthContainer({
  children,
  title,
  callback,
  errorMsg,
  handleClosePopup,
}: IProps) {
  return (
    <>
      <Stack
        py={6}
        minHeight={'100vh'}
        sx={{
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: 'url(/assets/images/signIn/bg-signIn.jpg)',
        }}
      >
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <IconButton
            onClick={callback}
            sx={{ position: 'absolute', top: 0, left: 20 }}
          >
            <Image
              src="/assets/images/vuesax/arrow-left-circle.svg"
              width={40}
              height={40}
              alt=""
            />
          </IconButton>
          <Box
            bgcolor={'#FFFFFF'}
            borderRadius={3}
            width={{ xs: '100%', md: '70%' }}
            px={{ xs: 2, md: 12 }}
            gap={2}
            py={3.5}
            display={'flex'}
            flexDirection="column"
            justifyContent="center"
          >
            <Stack alignItems={'center'} pb={1} gap={2}>
              <Image
                src="/assets/images/logo-border.svg"
                width={108}
                height={108}
                alt=""
              />
              <MuiTypography variant="h3" color={'secondary'}>
                {title}
              </MuiTypography>
            </Stack>
            {children}
          </Box>
        </Container>
      </Stack>

      <PopupNotification
        title={''}
        open={!!errorMsg}
        onCloseModal={() => handleClosePopup && handleClosePopup()}
        cancelText="Đóng"
      >
        <JustifyBox flexDirection={'column'} gap={4}>
          <Image
            src={'/assets/images/common/error.svg'}
            width={124}
            height={124}
            alt=""
          />
          <MuiTypography
            variant="subtitle2"
            fontSize={'1.125rem'}
            color={'secondary'}
          >
            {errorMsg}
          </MuiTypography>
        </JustifyBox>
      </PopupNotification>
    </>
  )
}
