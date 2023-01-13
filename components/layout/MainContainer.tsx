import React from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
}
function MainContainer({ children }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainHeader />
      {children}
      <MainFooter />
    </>
  )
}

export default MainContainer