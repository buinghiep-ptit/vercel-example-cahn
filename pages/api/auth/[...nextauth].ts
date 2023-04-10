/* eslint-disable @typescript-eslint/no-unused-expressions */
import { login, loginSocial, renewToken, setPassword } from '@/api-client'
import { getMessageString } from '@/helpers/messageToString'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, SessionStrategy } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import AppleProvider from 'next-auth/providers/apple'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const refreshAccessToken = async (payload: {
  refreshToken: string
}): Promise<JWT> => {
  try {
    // Get a new set of tokens with a refreshToken
    const tokenResponse = await renewToken(payload)

    return {
      ...payload,
      accessToken: tokenResponse.accessToken,
      expiredAt:
        (tokenResponse.expiresIn ?? 0) + (tokenResponse.created ?? 0) * 1000,
    }
  } catch (error) {
    return {
      ...payload,
      error: 'RefreshAccessTokenError' || error,
    }
  }
}
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      FacebookProvider({
        clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET as string,
        userinfo: {
          params: {
            fields:
              'id,email,first_name,last_name,birthday,picture{is_silhouette,url}',
          },
        },
        profile(profile: any) {
          return {
            ...profile,
            firstName: profile.first_name,
            lastName: profile.last_name,
            is_silhouette: profile.picture.data.is_silhouette,
            image: profile.picture.data.url,
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
          },
        },
      }),
      AppleProvider({
        clientId: process.env.NEXT_PUBLIC_APPLE_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_APPLE_SECRET as string,
      }),
      CredentialsProvider({
        type: 'credentials',
        credentials: {
          phoneNumber: { label: 'PhoneNumber', type: 'text' },
          password: { label: 'Password', type: 'password' },
          deviceId: { label: 'DeviceId', type: 'text' },
          accessToken: { label: 'AccessToken', type: 'text' },
          otpType: { label: 'OtpType', type: 'text' },
        },
        authorize: async (credentials, _req) => {
          const payload = credentials?.deviceId // isRegister
            ? {
                password: credentials?.password,
                deviceId: credentials?.deviceId,
                returnRefreshToken: true,
              }
            : {
                phoneNumber: credentials?.phoneNumber,
                password: credentials?.password,
                returnRefreshToken: true,
              }
          try {
            const user: any = credentials?.deviceId
              ? await setPassword(
                  payload,
                  credentials.otpType ?? 'REGISTER',
                  credentials?.accessToken,
                )
              : await login(payload)
            if (user && user.accessToken) {
              return user
            }

            return null
          } catch (error) {
            const msgStr = getMessageString(error as any)
            throw new Error(`${JSON.stringify({ errorMsg: msgStr })}`)
          }
        },
      }),
    ],
    secret: 'Ydgv0bGn5m4KmOA6W2Rq7anDSnEFvtckmjxy5bdbGUw=',
    debug: true,
    session: {
      strategy: 'jwt' as SessionStrategy,
      maxAge: 1 * 60,
    },
    jwt: {
      maxAge: 1 * 60,
    },
    pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      error: '/auth/error', // Error code passed in query string as ?error=
    },
    callbacks: {
      signIn: async ({ user, account }: { user: any; account: any }) => {
        if (account.provider !== 'credentials') {
          try {
            const data = await loginSocial({
              platform: account.provider.toUpperCase(),
              token: account.access_token,
              returnRefreshToken: true,
            })
            if (data && data.accessToken) {
              user.accessToken = data.accessToken
              user.refreshToken = data.refreshToken
              user.expiresIn = data.expiresIn
              user.created = data.created
            }
          } catch (error) {
            throw new Error(`${error}`)
          }
        }

        return true
      },
      async redirect({ url, baseUrl }: any) {
        // Allows relative callback URLs
        if (url.startsWith('/')) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
      jwt: async ({
        token,
        user,
      }: {
        token: any
        user?: any
        account?: any
      }) => {
        if (user) {
          token.accessToken = user.accessToken
          token.refreshToken = user.refreshToken
          token.expiredAt = (user.created ?? 0) * 1000 + (user.expiresIn ?? 0)
        }

        const shouldRefreshTime = Math.round(
          token.expiredAt - 5 * 60 * 1000 - Date.now(), // get before 5 minutes
        )

        if (shouldRefreshTime > 0) return token

        token = await refreshAccessToken({
          refreshToken: token.refreshToken,
        })

        return token
      },
      session: async ({ session, token }: { session: any; token: any }) => {
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        session.expiredAt = token.expiredAt
        return session
      },
    },
  }
}
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res) as NextAuthOptions)
}
