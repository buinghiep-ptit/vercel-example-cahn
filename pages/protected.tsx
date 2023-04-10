import { withAuth } from '@/HOCs'
import { PrimaryLayout } from '@/layouts'
import { GetServerSidePropsContext } from 'next'
import { Session } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import { ReactElement, useEffect } from 'react'

const Protected = () => {
  const { data: session } = useSession()
  useEffect(() => {
    ;(async () => {
      const s = await getSession()
    })()
  }, [])
  return (
    <div>
      <h1>Protected page</h1>
      <strong>Signed in as</strong>:{' '}
      <mark>{session && (session as any)?.accessToken}</mark>
      <p>auth info:{JSON.stringify(session)}</p>
    </div>
  )
}

export const getServerSideProps = withAuth({
  isProtected: true,
})((context: GetServerSidePropsContext) => {
  // Your normal `getServerSideProps` code here
  return { props: {} }
})

export default Protected
Protected.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
