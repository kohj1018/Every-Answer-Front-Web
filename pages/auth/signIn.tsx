import MainContainer from '../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'
import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { BuiltInProviderType } from 'next-auth/providers'
import googleLogo from '../../public/googleLogo.svg'
import { mockProviders } from 'next-auth/client/__tests__/helpers/mocks'
import callbackUrl = mockProviders.github.callbackUrl
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSnackbarOpen } from '../../stores/stores'
import { useRouter } from 'next/router'

const SignIn = () => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setIsSnackbarOpen, setMessage } = useSnackbarOpen()

  // 이미 로그인을 한 경우 Redirect
  useEffect(() => {
    if (userId && oauthId) {
      ;(async () => {
        await setMessage('이미 로그인 되어 있습니다.')
        await setIsSnackbarOpen(true)
        router.back()
      })()
    }
    setIsLoading(false)
  }, [userId, oauthId])


  // Providers를 불러옴
  useEffect(() => {
    ;(async () => {
      await getProviders()
        .then((res) => setProviders(res))
        .catch((e) => {
          alert('Error! : ' + e.response)
        })
    })()
  }, [])

  const handleSignIn = (providerId: LiteralUnion<BuiltInProviderType, string>) => {
    setIsLoading(true)
    signIn(providerId, {callbackUrl: 'https://www.everyanswer.kr/auth/signUp'})  // 배포 전: https://everyanswer.kr/auth/signUp / 로컬 환경: http://localhost:3000/auth/signUp
  }

  if (isLoading) return <p>loading...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader title='로그인' />
      <main className='paddingHeader flex flex-col items-center lg:mb-[18.375rem]'>
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