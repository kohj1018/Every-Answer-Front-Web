import MainContainer from '../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers'
import googleLogo from '../../public/googleLogo.svg'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useRouter } from 'next/router'
import { useRedirectIfSignIn } from '../../hooks/useRedirectIfSignIn'

const SignIn = () => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setIsSnackbarOpen, setMessage } = useSnackbarOpenStore()

  // 이미 로그인을 한 경우 Redirect
  useRedirectIfSignIn(router, userId, oauthId, setMessage, setIsSnackbarOpen, setIsLoading)


  // Providers를 불러옴
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      await getProviders()
        .then((res) => setProviders(res))
        .catch((e) => {
          alert('Error! : ' + e.response)
        })
        .finally(() => setIsLoading(false))
    })()
  }, [])

  const handleSignIn = (providerId: LiteralUnion<BuiltInProviderType, string>) => {
    setIsLoading(true)
    signIn(providerId, {callbackUrl: process.env.SIGNIN_CALLBACK_URL})  // 배포 환경: https://www.everyanswer.kr/auth/termsAndConditions / 로컬 환경: http://localhost:3000/auth/termsAndConditions
  }

  if (isLoading) return <p>loading...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader title='로그인' link='/' />
      <main className='flex flex-col items-center lg:mb-[18.375rem]'>
        <article className='mt-[14.6875rem] space-y-2 lg:mt-[14.5625rem] lg:space-y-[1.625rem]'>
          <h2 className='text-lg font-semibold text-gray-800 text-center lg:text-2xl'>세상에 없던 전공 질문 플랫폼</h2>
          <div className='relative w-[14.25rem] h-[2.25rem] lg:w-[21.4375rem] lg:h-[2.875rem]'>
            <Image
              src={mainLogo}
              fill
              className='object-contain'
              priority={true}
              alt='메인 로고'
            />
          </div>
        </article>
        <section className='mt-[16.25rem] lg:mt-[5rem]'>
          {providers &&
            Object.values(providers).map((provider) => {
              switch (provider.name) {
                case 'Google':
                  return (
                    <button
                      key={provider.name}
                      className='pl-2 pr-4 py-3 flex items-center justify-between space-x-6 rounded border border-blue-500'
                      onClick={() => handleSignIn(provider.id)}
                    >
                      <div className='relative w-[1.4375rem] h-[1.4375rem] lg:w-[2.25rem] lg:h-[2.25rem]'>
                        <Image
                          src={googleLogo}
                          fill
                          className='object-contain'
                          alt='구글 로고'
                        />
                      </div>
                      <p className='font-roboto text-base font-medium text-blue-500 lg:text-[1.4375rem]'>구글 계정으로 로그인하기</p>
                    </button>
                  )
                default:
                  return (
                    <p>에러</p>
                  )
              }
            })
          }
        </section>
      </main>
    </MainContainer>
  )
}

export default SignIn

// (
//   <div key={provider.name} style={{ marginBottom: 0 }}>
//     <button onClick={() => signIn(provider.id)} >
//       Sign in with{' '} {provider.name}
//     </button>
//   </div>
// )