import { GetServerSidePropsContext, Redirect } from 'next'
import { getSession } from 'next-auth/react'

export const withAuth = (options: WrapperOptions) => (gssp: any) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, resolvedUrl } = context
    const session = await getSession(context || { req })
    const destination = `${process.env.NEXTAUTH_URL}${resolvedUrl}`
    const callbackUrl = `/auth/signin?callbackUrl=${encodeURIComponent(
      destination,
    )}`

    if (options.isProtected && !session) {
      return {
        redirect: {
          destination: callbackUrl,
          permanent: false,
          ...options.redirect,
        },
      }
    }
    const gsspData = await gssp(context)
    return {
      props: {
        ...gsspData.props,
        session,
      },
    }
  }
}

export type WrapperOptions =
  | { isProtected: false }
  | { isProtected: true; redirect?: Redirect }
