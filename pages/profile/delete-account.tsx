import { DeleteAccount } from '@/components/profile/delete-account'
import { withAuth } from '@/HOCs'
import { PrimaryLayout } from '@/layouts'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import * as React from 'react'

export interface IProps {}

function DeleteAccountPage() {
  return (
    <>
      <DeleteAccount />
    </>
  )
}

export default DeleteAccountPage
DeleteAccountPage.getLayout = function getLayout(page: React.ReactElement) {
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
