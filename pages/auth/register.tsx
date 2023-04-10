/* eslint-disable import/no-unresolved */
import { registerOTP, resendOTP, validateOTP } from '@/api-client'
import { AuthContainer } from '@/components/AuthContainer'
import { AppLoading } from '@/components/commons/AppLoading'
import { MuiButton } from '@/components/commons/MuiButton'
import { MuiRHFCheckBox } from '@/components/commons/MuiRHFCheckBox'
import { MuiRHFInputText } from '@/components/commons/MuiRHFTextInput'
import { OtpInput } from '@/components/commons/otp-input'
import { JustifyBox } from '@/components/home/CAHNTV'
import { getMessageString } from '@/helpers/messageToString'
import { passwordSchema, phoneNumberSchema } from '@/helpers/schemaYup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import _ from 'lodash'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface IProps {}

type SchemaType = {
  phoneNumber?: string
  password?: string
  passwordConfirmation?: string
  isAgree?: boolean
}

export default function SignUp() {
  const router = useRouter()
  const [otp, setOtp] = React.useState('')
  const [isResend, setIsResend] = React.useState(false)
  const [step, setStep] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [errors, setErrors] = React.useState<{ errorMsg?: string }>()
  const [accessTokenTemporary, setAccessTokenTemporary] = React.useState('')
  const [showPassword, setShowPassword] = React.useState<{
    visibility: boolean
  }>({
    visibility: false,
  })
  const [countDown, setCountDown] = React.useState(60)

  const inputRef = React.useRef<any>(null)

  React.useEffect(() => {
    if (!inputRef.current || !inputRef) return
    const timeout = setTimeout(() => {
      inputRef.current.focus()
    }, 100)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  React.useEffect(() => {
    if (step !== 2) {
      setCountDown(60)
      return
    }
    const interval = setInterval(() => {
      if (!!countDown) setCountDown(countDown - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countDown, step, isResend])

  const validationSchema = Yup.object().shape({
    ...phoneNumberSchema(true),
    password: passwordSchema(step === 3).password,
    passwordConfirmation: passwordSchema(step === 3).passwordConfirmation,
  })

  const methods = useForm({
    defaultValues: {
      isAgree: false,
      phoneNumber: '',
      password: '',
      passwordConfirmation: '',
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const isAgree = methods.watch('isAgree')
  const phoneNumber = methods.watch('phoneNumber')
  const password = methods.watch('password')
  const repassword = methods.watch('passwordConfirmation')

  const handleLoginFacebook = async () => {
    setIsLoading(true)

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
    setIsLoading(false)
  }

  const handleLoginGoogle = async () => {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  const handleClickShowPassword = () => {
    setShowPassword(prev => ({
      ...prev,
      visibility: !prev.visibility,
    }))
  }

  const handleSetPassword = async (
    password: string,
    deviceId: string,
    accessToken: string,
  ) => {
    await signIn('credentials', {
      password: password,
      deviceId: deviceId,
      accessToken: accessToken,
      redirect: false,
      callbackUrl: `${
        router.query.callbackUrl
          ? router.query.callbackUrl
          : window.location.origin
      }`,
    }).then(({ ok, error }: any) => {
      setIsLoading(false)

      if (!ok) {
        setErrors(prev => ({
          ...prev,
          errorMsg: JSON.parse(error).errorMsg,
        }))
      } else {
        router.push('/')
        setErrors(undefined)
      }
    })
  }

  const onSubmitHandler: SubmitHandler<SchemaType> = async (
    values: SchemaType,
  ) => {
    try {
      setIsLoading(true)
      if (step === 1) {
        await registerOTP({ phoneNumber: values.phoneNumber })
        setIsLoading(false)
      } else if (step === 2) {
        const resultValidOTP = await validateOTP({
          phoneNumber: values.phoneNumber,
          otp: otp,
        })
        setIsLoading(false)

        if (resultValidOTP?.accessToken)
          setAccessTokenTemporary(resultValidOTP.accessToken)
      } else {
        handleSetPassword(
          values.password ?? '',
          '451796cc-9e5f-4424-8bf8-c1e6040b6d47',
          accessTokenTemporary ?? '',
        )
      }

      if (step < 3) setStep(step + 1)
    } catch (error) {
      setIsLoading(false)

      const msgStr = getMessageString(error as any)
      setErrors(prev => ({
        ...prev,
        errorMsg: msgStr,
      }))
    }
  }

  const handleGoBack = () => {
    if (step === 1) {
      router.push('/')
      return
    }
    setStep(step - 1)
  }

  const handleClose = () => {
    setErrors(undefined)
  }

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Đăng ký'
      case 2:
        return 'Xác nhận tài khoản'
      case 3:
        return 'Thiết lập mật khẩu'

      default:
        return ''
    }
  }

  const resendOTPRegister = async () => {
    try {
      setIsLoading(true)
      await resendOTP({ phone: phoneNumber, otpType: 'REGISTER' })
      setOtp('')
      setIsResend(true)
      setCountDown(60)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <AppLoading />}

      <AuthContainer
        title={getStepLabel(step ?? 0)}
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
                {step === 1 && (
                  <>
                    <Stack gap={1.5}>
                      <Typography variant="body1" color={'secondary'}>
                        Sử dụng số điện thoại để đăng ký tài khoản
                      </Typography>
                      <MuiRHFInputText
                        inputRef={inputRef}
                        label={'Số điện thoại'}
                        required
                        type="text"
                        name="phoneNumber"
                        defaultValue=""
                        placeholder="Nhập số điện thoại"
                        autoFocus
                      />
                    </Stack>
                    <Stack direction={'row'} gap={2} alignItems="flex-start">
                      <MuiRHFCheckBox
                        name="isAgree"
                        label={
                          <Typography variant="body1" color={'secondary'}>
                            Bằng việc đăng ký, bạn đã đồng ý với CAHN FC về{' '}
                            <span style={{ fontWeight: 500 }}>
                              Điều khoản sử dụng{' '}
                            </span>{' '}
                            và{' '}
                            <span style={{ fontWeight: 500 }}>
                              Chính sách bảo mật!
                            </span>
                          </Typography>
                        }
                      />
                    </Stack>
                  </>
                )}
                {step === 2 && (
                  <JustifyBox flexDirection={'column'} gap={6}>
                    <Typography variant="body1" color={'secondary'}>
                      Nhập mã xác thực gồm 6 ký tự được gửi đến số điện thoại{' '}
                      <span style={{ fontWeight: 500 }}>
                        {phoneNumber.slice(0, 3) +
                          '******' +
                          phoneNumber.slice(9)}
                      </span>
                    </Typography>
                    <OtpInput
                      value={otp}
                      onChange={val => {
                        setOtp(val)
                      }}
                    />
                    <Button
                      disabled={!!countDown}
                      onClick={resendOTPRegister}
                      variant="text"
                      sx={{ textTransform: 'inherit' }}
                    >
                      <Typography variant="body1" color={'secondary'}>
                        Chưa nhận được mã OTP?{' '}
                        <span
                          style={{
                            fontWeight: 500,
                            color: countDown ? 'inherit' : '#ED1E24',
                          }}
                        >
                          {countDown ? `Gửi lại sau: ${countDown}s` : 'Gửi lại'}
                        </span>
                      </Typography>
                    </Button>
                  </JustifyBox>
                )}

                {step === 3 && (
                  <>
                    <Stack gap={1.5}>
                      <Typography variant="body1" color={'secondary'}>
                        Nhập mật khẩu
                      </Typography>
                      <MuiRHFInputText
                        label={'Mật khẩu'}
                        type={showPassword.visibility ? 'text' : 'password'}
                        name="password"
                        defaultValue=""
                        placeholder="Nhập mật khẩu"
                        iconEnd={
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
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

                    <Stack gap={1.5}>
                      <Typography variant="body1" color={'secondary'}>
                        Nhập lại mật khẩu
                      </Typography>
                      <MuiRHFInputText
                        label={'Nhập lại mật khẩu'}
                        type={showPassword.visibility ? 'text' : 'password'}
                        name="passwordConfirmation"
                        defaultValue=""
                        placeholder="Nhập lại mật khẩu"
                        iconEnd={
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
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
                  </>
                )}

                <MuiButton
                  disabled={
                    (step === 1 && (!isAgree || !phoneNumber)) ||
                    (step === 2 && otp.length < 6) ||
                    (step === 3 && (!password || !repassword)) ||
                    !_.isEmpty(methods.formState.errors)
                  }
                  loading={isLoading}
                  type="submit"
                  sx={{
                    color: '#FFD200',
                    width: '100%',
                    height: 48,
                    mt: 1.5,
                  }}
                  title={step === 1 ? 'Đăng ký' : 'Tiếp tục'}
                />
              </Stack>
            </FormProvider>
          </form>
          {step === 1 && (
            <Stack mt={4} gap={2}>
              <Typography
                variant="body1"
                color={'secondary'}
                textAlign="center"
              >
                Hoặc đăng nhập bằng
              </Typography>
              <Stack direction={'row'} gap={3} justifyContent="center">
                <Button
                  onClick={handleLoginFacebook}
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
                  onClick={handleLoginGoogle}
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
          )}
          {step === 2 && (
            <Button
              variant="text"
              onClick={() => setStep(1)}
              sx={{ textTransform: 'inherit', mt: 2, p: 0 }}
            >
              <Typography
                variant="body1"
                sx={{ color: '#ED1E24', fontWeight: 600 }}
                textAlign="center"
              >
                Thay đổi số điện thoại
              </Typography>
            </Button>
          )}
          {step === 3 && (
            <Stack
              bgcolor={'#FFF5F5'}
              px={3}
              py={1.5}
              borderRadius={2}
              gap={1}
              mt={2}
            >
              <Typography
                variant="subtitle1"
                color={'secondary'}
                sx={{ fontWeight: 500 }}
              >
                Quy định về mật khẩu
              </Typography>
              <Typography
                variant="subtitle1"
                color={'secondary'}
                sx={{ fontWeight: 400 }}
              >
                1. Từ 8 đến 32 ký tự
              </Typography>
              <Typography
                variant="subtitle1"
                color={'secondary'}
                sx={{ fontWeight: 400 }}
              >
                2. Chứa các kí tự thuộc tất cả các nhóm sau:
              </Typography>
              <Stack direction={'row'} gap={2}>
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  sx={{ fontWeight: 400, flex: 1 }}
                >
                  a. Ký tự tiếng Anh viết hoa (A-Z) <br />
                  b. Ký tự tiếng Anh viết thường (a-z)
                </Typography>
                <Typography
                  variant="subtitle1"
                  color={'secondary'}
                  sx={{ fontWeight: 400, flex: 1 }}
                >
                  c. Ký tự số (0-9)
                  <br /> d. Ký tự đặc biệt (!~*@^&)
                </Typography>
              </Stack>
            </Stack>
          )}
        </>
      </AuthContainer>
    </>
  )
}
