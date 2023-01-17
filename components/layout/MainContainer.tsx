import React from 'react'
import MainHeader from './MainHeader'
import MainFooter from './MainFooter'
import Head from 'next/head'

interface Props {
  children: React.ReactNode
  isHiddenHeaderAndFooterOnMobile?: boolean // default값 false (MainHeader, MainFooter 보여짐)
}
function MainContainer({ children, isHiddenHeaderAndFooterOnMobile = false }: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <MainHeader isHiddenHeaderAndFooterOnMobile={isHiddenHeaderAndFooterOnMobile} />
      {children}
      <MainFooter isHiddenHeaderAndFooterOnMobile={isHiddenHeaderAndFooterOnMobile} />
    </>
  )
}

export default MainContainer