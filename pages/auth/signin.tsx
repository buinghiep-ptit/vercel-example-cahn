import { AuthContainer } from '@/components/AuthContainer'
import { AppLoading } from '@/components/commons/AppLoading'
import { MuiButton } from '@/components/commons/MuiButton'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { phoneNumberSchema } from '@/helpers/schemaYup'
import { messages } from '@/utils/messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import _ from 'lodash'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface IProps {}

type SchemaType = {
  phoneNumber?: string
  password?: string
}

export default function SignIn() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLogging, setIsLogging] = React.useState(false)
  const [errors, setErrors] = React.useState<{ errorMsg?: string }>()

  React.useEffect(() => {
    if (session) router.push('/')
  })

  const [showPassword, setShowPassword] = React.useState<{
    visibility: boolean
  }>({
    visibility: false,
  })

  const validationSchema = Yup.object().shape({
    ...phoneNumberSchema(true),
    password: Yup.string().required(messages.MSG1),
  })

  const methods = useForm({
    defaultValues: { phoneNumber: '', password: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const onSubmitHandler: SubmitHandler<SchemaType> = (values: SchemaType) => {
    handleLoginPhone(values.phoneNumber ?? '', values.password ?? '')
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const handleLoginPhone = async (phoneNumber: string, password: string) => {
    setIsLogging(true)
    await signIn('credentials', {
      phoneNumber: phoneNumber,
      password: password,
      redirect: false,
      callbackUrl: `${
        router.query.callbackUrl
          ? router.query.callbackUrl
          : window.location.origin
      }`,
    }).then(({ ok, error }: any) => {
      setIsLogging(false)

      if (!ok) {
        setErrors(prev => ({
          ...prev,
          errorMsg: JSON.parse(error).errorMsg,
        }))
      } else {
        setErrors(undefined)
      }
    })
  }

  const handleLoginFacebook = async (e: any) => {
    e.preventDefault()
    setIsLogging(true)

    const result = await signIn('facebook', {
      redirect: false,
      callbackUrl: `${
        router.query.callbackUrl
          ? router.query.callbackUrl
          : window.location.origin
      }`,
    })

    if (result?.error) {
      setErrors(prev => ({
        ...prev,
        errorMsg: 'Đăng nhập không thành công, vui lòng thử lại!',
      }))
    } else {
      setErrors(undefined)
    }
    setIsLogging(false)
  }

  const handleLoginGoogle = async (e: any) => {
    e.preventDefault()

    setIsLogging(true)

    const result = await signIn('google', {
      redirect: false,
      callbackUrl: `${
        router.query.callbackUrl
          ? router.query.callbackUrl
          : window.location.origin
      }`,
    })
    if (result?.error) {
      setErrors(prev => ({
        ...prev,
        errorMsg: 'Đăng nhập không thành công, vui lòng thử lại!',
      }))
    } else {
      setErrors(undefined)
    }
    setIsLogging(false)
  }

  const handleClose = () => {
    setErrors(undefined)
  }

  const handleGoBack = () => {
    router.push('/')
  }

  return (
    <>
      {isLogging && <AppLoading />}
      <AuthContainer
        title={'Đăng nhập'}
        errorMsg={errors?.errorMsg}
        handleClosePopup={handleClose}
        callback={handleGoBack}
      >
        <>
          <form
            onSubmit={methods.handleSubmit(onSubmitHandler)}
            noValidate
            autoComplete="off"
          >
            <FormProvider {...methods}>
              <Stack gap={2}>
                <Stack gap={1}>
                  <Typography variant="body1" color={'secondary'}>
                    Số điện thoại
                  </Typography>
                  <MuiRHFInputText
                    label={'Số điện thoại'}
                    required
                    type="text"
                    name="phoneNumber"
                    defaultValue=""
                    placeholder="Nhập số điện thoại"
                    autoFocus={true}
                  />
                </Stack>

                <Stack gap={1}>
                  <Typography variant="body1" color={'secondary'}>
                    Mật khẩu
                  </Typography>
                  <MuiRHFInputText
                    label={'Mật khẩu'}
                    type={showPassword.visibility ? 'text' : 'password'}
                    name="password"
                    defaultValue=""
                    placeholder="Nhập mật khẩu"
                    iconEnd={
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {!showPassword.visibility ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    }
                    fullWidth
                    required
                  />
                </Stack>
                <Link href={'/forgot-password'} passHref>
                  <a>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color={'secondary'}
                      textAlign="end"
                    >
                      Quên mật khẩu?
                    </Typography>
                  </a>
                </Link>

                <MuiButton
                  disabled={!_.isEmpty(methods.formState.errors)}
                  type="submit"
                  variant="contained"
                  loading={isLogging}
                  sx={{
                    color: '#FFD200',
                    width: '100%',
                    height: 48,
                    mt: 1,
                  }}
                  title="Đăng nhập"
                />
              </Stack>
            </FormProvider>
          </form>
          <Stack my={3.5} gap={1.5}>
            <Typography variant="body1" color={'secondary'} textAlign="center">
              Hoặc đăng nhập bằng
            </Typography>
            <Stack direction={'row'} gap={3} justifyContent="center">
              <Button
                onClick={e => handleLoginFacebook(e)}
                variant="contained"
                sx={{
                  height: 48,
                  background: '#E7F5FF',
                  boxShadow: 'none',
                  width: 175,
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent="center"
                  gap={2}
                  px={1}
                >
                  <Image
                    src="/assets/images/social/fb-square.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color={'secondary'}
                  >
                    Facebook
                  </Typography>
                </Stack>
              </Button>
              <Button
                onClick={e => handleLoginGoogle(e)}
                variant="contained"
                sx={{
                  height: 48,
                  background: '#FFF5F5',
                  boxShadow: 'none',
                  width: 175,
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent="center"
                  gap={2}
                  px={1}
                >
                  <Image
                    src="/assets/images/social/gg-square.svg"
                    width={24}
                    height={24}
                    alt=""
                  />
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color={'secondary'}
                  >
                    Google
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          </Stack>
          <Link href={'/register'} passHref>
            <a>
              <Typography
                variant="body1"
                color={'secondary'}
                textAlign="center"
              >
                Bạn chưa có tài khoản?{' '}
                <span style={{ color: '#ED1E24', fontWeight: 600 }}>
                  Đăng ký ngay
                </span>
              </Typography>
            </a>
          </Link>
        </>
      </AuthContainer>
    </>
  )
}
