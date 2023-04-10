import { IUserInfo } from '@/models'
import { AxiosResponse } from 'axios'
import { http } from './http-config'

type LoginPayload = {
  phoneNumber?: string
  password?: string
  returnRefreshToken?: boolean
}

type LoginSocialPayload = {
  platform?: 'GOOGLE' | 'FACEBOOK' | 'APPLE'
  token?: string
  idToken?: string
  fullName?: string
  lastName?: string
  firstName?: string
  returnRefreshToken?: boolean
}

export type AuthResponse = {
  accessToken?: string
  expiresIn?: number
  created?: number
  tokenType?: string
  refreshToken?: string
}

export const login = async (params: LoginPayload): Promise<AuthResponse> => {
  const { data } = await http.post<LoginPayload, AxiosResponse<AuthResponse>>(
    '/auth/api/customer/authenticate',
    params,
  )
  return data
}

export const loginSocial = async (
  params: LoginSocialPayload,
): Promise<AuthResponse> => {
  const { data } = await http.post<
    LoginSocialPayload,
    AxiosResponse<AuthResponse>
  >('/auth/api/customer/oauth2', params)
  return data
}

export const logOut = async (): Promise<any> => {
  const { data } = await http.post<any>('/auth/api/customer/logout')
  return data
}

export const renewToken = async (params: {
  refreshToken?: string
}): Promise<AuthResponse> => {
  const { data } = await http.post<AuthResponse>(
    '/auth/api/customer/authenticate/refresh',
    params,
  )
  return data
}

export const getProfile = async (): Promise<IUserInfo> => {
  const { data } = await http.get<IUserInfo>('/auth/api/customer/profile')
  return data
}

// #SIGNUP
export const registerOTP = async (params: {
  phoneNumber?: string
}): Promise<{ verify?: string }> => {
  const { data } = await http.post<any, AxiosResponse<{ verify?: string }>>(
    '/auth/api/customer/register',
    params,
  )
  return data
}

export const resendOTP = async (params: {
  phone?: string
  email?: string
  otpType?:
    | 'REGISTER'
    | 'FORGOT_PASSWORD'
    | 'LOGIN'
    | 'CHANGE_PHONE_NUMBER'
    | 'REMOVE_ACCOUNT'
    | 'UPDATE_EMAIL'
}): Promise<{ verify?: string }> => {
  const { data } = await http.post<any, AxiosResponse<{ verify?: string }>>(
    '/auth/api/customer/public/resend-otp',
    params,
  )
  return data
}

export const validateOTP = async (params: {
  phoneNumber?: string
  otp?: string
}): Promise<{ accessToken?: string }> => {
  const { data } = await http.post<
    any,
    AxiosResponse<{ accessToken?: string }>
  >('/auth/api/customer/register/validate', params)
  return data
}

export const setPassword = async (
  params: {
    password?: string
    deviceId?: string
    returnRefreshToken?: boolean
  },
  otpType?:
    | 'REGISTER'
    | 'FORGOT_PASSWORD'
    | 'LOGIN'
    | 'CHANGE_PHONE_NUMBER'
    | 'REMOVE_ACCOUNT'
    | 'UPDATE_EMAIL'
    | string,
  token?: string,
): Promise<AuthResponse> => {
  const { data } = await http.post<any, AxiosResponse<AuthResponse>>(
    `/auth/api/customer/${
      otpType === 'REGISTER' ? 'register/password' : 'password/new-password'
    }`,
    params,
    {
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return data
}

// forgot password

export const requestForgotOTP = async (params: {
  phoneNumber?: string
}): Promise<{ verify?: string }> => {
  const { data } = await http.post<any, AxiosResponse<{ verify?: string }>>(
    '/auth/api/customer/password',
    params,
  )
  return data
}

export const validateForgotOTP = async (params: {
  phoneNumber?: string
  otp?: string
}): Promise<{ accessToken?: string }> => {
  const { data } = await http.post<
    any,
    AxiosResponse<{ accessToken?: string }>
  >('/auth/api/customer/password/validate', params)
  return data
}

// REMOVE ACCOUNT

export const removeAccValidate = async (params: {
  otp?: string
  type?: 1 | 2
}): Promise<{ accessToken?: string }> => {
  const { data } = await http.post<
    any,
    AxiosResponse<{ accessToken?: string }>
  >('/auth/api/customer/remove/account/validate', params)
  return data
}

export const removeAccFinished = async (
  type?: 1 | 2,
): Promise<{ accessToken?: string }> => {
  const { data } = await http.post<
    any,
    AxiosResponse<{ accessToken?: string }>
  >(`/auth/api/customer/remove/account?type=${type}`)
  return data
}
