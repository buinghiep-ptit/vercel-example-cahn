import { ILayoutProps } from '@/models'
import * as React from 'react'

export interface IEmptyLayoutProps {}

export function EmptyLayout({ children }: ILayoutProps) {
  return <>{children}</>
}
