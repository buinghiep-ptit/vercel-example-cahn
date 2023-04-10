import { fetchPosts } from '@/api-client'
import { IPost } from '@/models'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import * as React from 'react'

// const Header = dynamic(() => import('@/components/commons/header'), {
//   ssr: false,
// })
export interface IAboutPageProps {
  posts?: IPost[]
}

export default function AboutPage() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  }: UseQueryResult<IPost[], Error> = useQuery<IPost[], Error>(
    ['posts'],
    fetchPosts,
  )
  return (
    <div>
      About us page
      {/* <Header /> */}
    </div>
  )
}

// export async function getServerSideProps() {
//   console.log('getServerSideProps')
//   return {
//     props: {
//       posts: null,
//     },
//   }
// }
