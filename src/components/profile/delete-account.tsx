import { resendOTP } from '@/api-client'
import { phoneRegExp } from '@/helpers/schemaYup'
import { messages } from '@/utils/messages'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Container, FormControlLabel, Radio, Stack } from '@mui/material'
import _ from 'lodash'
import * as React from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { Breadcrumb } from '../commons/Breadcrumb'
import { MuiButton } from '../commons/MuiButton'
import { MuiRHFRadioGroup } from '../commons/MuiRHFRadioGroup'
import { MuiRHFInputText } from '../commons/MuiRHFTextInput'
import { MuiTypography } from '../commons/MuiTypography'
import { OtpInput } from '../commons/otp-input'
import { JustifyBox } from '../home/CAHNTV'

type SchemaType = {
  email?: string
  phoneNumber?: string
  registerType?: number
}
export interface IDeleteAccountProps {}

export function DeleteAccount(props: IDeleteAccountProps) {
  const [otp, setOtp] = React.useState('')
  const [isResend, setIsResend] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [countDown, setCountDown] = React.useState(0)

  React.useEffect(() => {
    if (!isResend) return
    const interval = setInterval(() => {
      if (!!countDown) setCountDown(countDown - 1)
      else {
        setIsResend(false)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [countDown, isResend])

  const validationSchema = Yup.object().shape(
    {
      registerType: Yup.string().required(messages.MSG1),
      email: Yup.string()
        .email(messages.MSG12)
        .when(['registerType'], {
          is: (registerType: string) =>
            !!registerType && Number(registerType) === 1,
          then: Yup.string()
            .email(messages.MSG12)
            .required(messages.MSG1)
            .test(
              'validate email',
              'Số ký tự trước @ không thể vượt quá 64',
              email => {
                if (!email?.includes('@')) return true
                return email.split('@')[0].length <= 64
              },
            )
            .max(255, 'Nội dung không được vượt quá 255 ký tự'),
        }),
      phoneNumber: Yup.string()
        .nullable()
        .when(['registerType'], {
          is: (registerType: any) =>
            !!registerType && Number(registerType) === 2,
          then: Yup.string()
            .matches(phoneRegExp, {
              message: messages.MSG0,
              excludeEmptyString: true,
            })
            .test('len', 'Số điện thoại yêu cầu 10 ký tự', val => {
              if (val == undefined) {
                return true
              }
              return val.length == 0 || val.length === 10
            })
            .required(messages.MSG1)
            .nullable(),
        }),
    },
    [['registerType', 'registerType']],
  )

  const methods = useForm({
    defaultValues: { registerType: 1, email: '', phoneNumber: '' },
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  })

  const registerType = methods.watch('registerType')
  const email = methods.watch('email')
  const phoneNumber = methods.watch('phoneNumber')

  React.useEffect(() => {
    methods.setValue('email', '')
    methods.setValue('phoneNumber', '')
    methods.clearErrors()
  }, [registerType, methods])

  const onSubmitHandler: SubmitHandler<SchemaType> = async (
    values: SchemaType,
  ) => {
    try {
      setIsLoading(true)
      await resendOTP({
        phone: values.phoneNumber ?? '',
        email: values.email ?? '',
        otpType: 'REMOVE_ACCOUNT',
      })
      setOtp('')
      setIsResend(true)
      setCountDown(60)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const finishDeleteAccount = async () => {}

  return (
    <Box
      sx={{
        pt: 14,
        minHeight: '100vh',
      }}
    >
      <Container sx={{ py: 2 }}>
        <Breadcrumb
          routeSegments={[
            { name: 'Tài khoản', path: '/profile' },
            { name: 'Xóa tài khoản' },
          ]}
        />
        <MuiTypography
          variant="h2"
          color={'secondary'}
          letterSpacing="1px"
          mt={4}
        >
          Xóa tài khoản
        </MuiTypography>
        <form
          onSubmit={methods.handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
        >
          <FormProvider {...methods}>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              gap={{ xs: 2, md: 17 }}
            >
              <Stack gap={4} mt={3.5}>
                <MuiRHFRadioGroup name="registerType" defaultValue={1}>
                  <Stack gap={2.5}>
                    <MuiTypography variant="body1" color={'secondary'}>
                      Mã xác nhận xóa tài khoản sẽ được gửi tới:
                    </MuiTypography>
                    <Stack gap={0.5}>
                      <FormControlLabel
                        disabled={!!countDown}
                        value={1}
                        control={<Radio sx={{ mb: 0.5 }} />}
                        label="Email"
                      />
                      <MuiRHFInputText
                        inputRef={input =>
                          !countDown && registerType == 1 && input?.focus()
                        }
                        disabled={!!countDown || registerType == 2}
                        label={'Email'}
                        required
                        type="text"
                        name="email"
                        defaultValue=""
                        placeholder="Nhập email"
                        autoFocus
                      />
                    </Stack>

                    <Stack gap={0.5}>
                      <FormControlLabel
                        disabled={!!countDown}
                        value={2}
                        control={<Radio sx={{ mb: 0.5 }} />}
                        label="Số điện thoại"
                      />

                      <MuiRHFInputText
                        inputRef={input =>
                          !countDown && registerType == 2 && input?.focus()
                        }
                        disabled={!!countDown || registerType == 1}
                        label={'Số điện thoại'}
                        required
                        type="text"
                        name="phoneNumber"
                        defaultValue=""
                        placeholder="Nhập số điện thoại"
                        autoFocus
                      />
                    </Stack>
                  </Stack>
                </MuiRHFRadioGroup>
                <MuiButton
                  type="submit"
                  disabled={
                    !!countDown ||
                    (!phoneNumber && !email) ||
                    !_.isEmpty(methods.formState.errors)
                  }
                  title={countDown ? `${countDown}s` : 'Gửi mã'}
                  sx={{ bgcolor: '#212529', color: '#FFD200', width: 400 }}
                />
              </Stack>

              <JustifyBox
                flexDirection={'column'}
                gap={4}
                px={5}
                py={3}
                bgcolor="#FFF5F5"
                borderRadius={6}
              >
                <MuiTypography
                  variant="h4"
                  fontSize={'1.75rem'}
                  color={'secondary'}
                  letterSpacing="1px"
                >
                  Nhập mã xác nhận
                </MuiTypography>
                <OtpInput
                  disabled={!countDown}
                  value={otp}
                  onChange={val => {
                    setOtp(val)
                  }}
                  isPriorityFocus={!!countDown}
                />

                <MuiButton
                  disabled={
                    otp.length < 6 || !_.isEmpty(methods.formState.errors)
                  }
                  loading={isLoading}
                  type="submit"
                  sx={{
                    color: '#FFD200',
                    width: 56 * 6 + 5 * 24,
                    height: 48,
                    mt: 1.5,
                  }}
                  title={'Xác nhận'}
                />

                <Stack gap={1.5}>
                  <MuiTypography
                    variant="subtitle1"
                    color={'secondary'}
                    sx={{ fontWeight: 400 }}
                  >
                    Sau khi xóa tài khoản, toàn bộ thông tin của bạn sẽ bị xóa
                    khỏi hệ thống web site và ứng dụng của CANHN FC.
                  </MuiTypography>
                  <MuiTypography
                    variant="subtitle1"
                    color={'secondary'}
                    sx={{ fontWeight: 400 }}
                  >
                    Sau 7 ngày kể từ thời điểm xóa tài khoản, tài khoản của bạn
                    sẽ được xóa.
                  </MuiTypography>
                  <MuiTypography
                    variant="subtitle1"
                    color={'secondary'}
                    sx={{ fontWeight: 400 }}
                  >
                    <span style={{ fontWeight: 600 }}>Lưu ý: </span>Trong khoảng
                    thời gian 7 ngày này, nếu bạn thực hiện đăng nhập, yêu cầu
                    xóa tài khoản của bạn sẽ được hủy bỏ.
                  </MuiTypography>
                </Stack>
              </JustifyBox>
            </Stack>
          </FormProvider>
        </form>
      </Container>
    </Box>
  )
}
