// import { authApi } from '@/api-client'
import { getProfile } from '@/api-client'
import { Profile } from '@/components/profile'
import { withAuth } from '@/HOCs'
import { PrimaryLayout } from '@/layouts'
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import * as React from 'react'

export interface IProfilePageProps {}

function ProfilePage(props: IProfilePageProps) {
  const { data: session } = useSession()

  const getProfileUser = async () => {
    try {
      await getProfile()
    } catch (error) {
      alert(error)
    }
  }
  return <Profile />
}
// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   return {
//     props: {
//       session: await getSession(ctx),
//     },
//   }
// }
export default ProfilePage
ProfilePage.getLayout = function getLayout(page: React.ReactElement) {
  return <PrimaryLayout isChangeColorHeader={false}>{page}</PrimaryLayout>
}

export const getServerSideProps = withAuth({
  isProtected: true,
})(async (context: GetServerSidePropsContext) => {
  // Your normal `getServerSideProps` code here
  return {
    props: {
      session: await getSession(context),
    },
  }
})
