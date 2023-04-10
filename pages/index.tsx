/* eslint-disable import/no-named-as-default-member */
import { PrimaryLayout } from '@/layouts'
import { NextPageWithLayout } from '@/models'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

const Home = dynamic(() => import('../src/components/home'), {
  ssr: false,
})

const HomePage: NextPageWithLayout = () => {
  return <Home />
}

export default HomePage
HomePage.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
