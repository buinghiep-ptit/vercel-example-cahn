import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface ILayoutProps {
  children?: ReactNode
}

export type GetLayout = (page: ReactElement) => ReactNode

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: GetLayout
}

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}
