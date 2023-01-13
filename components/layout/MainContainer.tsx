import React from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
  mainCss: string
}
function MainContainer({ children, mainCss }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainHeader />
      <main className={mainCss}>
        {children}
      </main>
      <MainFooter />
    </>
  )
}

export default MainContainer