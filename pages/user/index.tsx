import { NextPage } from 'next'
import MainContainer from '../../components/layout/MainContainer'
import {
  AlertTriangle,
  CheckCircle,
  CheckSquare,
  ChevronRight,
  Edit3, GitHub,
  HelpCircle, Lock,
  Pocket,
  ThumbsUp,
  User as UserIcon,
} from 'react-feather'
import { useQuery } from 'react-query'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { getOtherUserById } from '../../utils/apis/usersApi'
import React, { Suspense } from 'react'
import { useRouter } from 'next/router'
import { useSnackbarOpenStore } from '../../stores/stores'
import { useRedirectIfNotSignIn } from '../../hooks/useRedirectIfNotSignIn'
import Link from 'next/link'
import { SERVICE_VERSION } from '../../utils/config'

const User: NextPage = () => {
  const router = useRouter()
  const { userId, oauthId } = useSignInInfoStore()  // TODO : 클라이언트 제품에서는 오류가 보이진 않으나 콘솔창에서 확인됨. 추후 해결 반드시 필요
  const { data: userData } = useQuery(
    ['userInfo', userId],
    () => getOtherUserById(userId!),
    {
      enabled: !!(userId && oauthId),
      staleTime: 60000, // 60초
      refetchOnWindowFocus: false
    }
  )
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()

  // 로그인하지 않은 경우 Redirect
  useRedirectIfNotSignIn(router, userId, oauthId, setMessage, setIsSnackbarOpen)


  return (
    <MainContainer>
      <main className='marginHeader py-10 px-5 lg:py-20 lg:mainWidthLimit'>
        <Suspense fallback={<p>loading...</p>}>
          <article className='w-full flex flex-col items-center space-y-3'>
            <div className='w-[3.625rem] h-[3.625rem] flex items-center justify-center rounded-full bg-gray-100 lg:w-[5rem] lg:h-[5rem]'>
              <UserIcon className='w-8 h-8 text-gray-400 lg:w-11 lg:h-11' />
            </div>
            <p className='text-lg font-semibold text-gray-900 lg:text-2xl'>{userData?.nickname}</p>
          </article>

          <article className='mt-8 py-6 grid grid-cols-[128px_1fr] gap-y-[1.125rem] text-gray-800 border-y border-gray-100 lg:mt-20 lg:grid-cols-[300px_1fr]'>
            <p className='text-sm font-semibold lg:text-lg'>전공분류</p>
            <p className='text-base font-medium lg:text-xl'>{userData?.deptClass.name}</p>
            <p className='text-sm font-semibold lg:text-lg'>대학</p>
            <p className='text-base font-medium lg:text-xl'>{userData?.univ}</p>
            <p className='text-sm font-semibold lg:text-lg'>전공</p>
            <p className='text-base font-medium lg:text-xl'>{userData?.deptName}</p>
            <p className='text-sm font-semibold lg:text-lg'>학번</p>
            <p className='text-base font-medium lg:text-xl'>{userData?.entranceYear.toString().padStart(2, '0')}학번</p>
          </article>

          <article className='mt-6 w-full flex justify-between gap-x-2 lg:mt-10 lg:gap-x-3.5'>
            <BoxButton name='질문한 글' link={`/user/record/questionPosts/${userId}`}>
              <Edit3 className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <BoxButton name='답변한 글' link={`/user/record/answerPosts/${userId}`}>
              <CheckCircle className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <BoxButton name='좋아요한 글' link={`/user/record/likeAnswerPosts/${userId}`}>
              <ThumbsUp className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <BoxButton name='학교 인증' link='/'>
              <Pocket className='w-5 h-5 text-gray-600' />
            </BoxButton>
          </article>

          <article className='mt-8 space-y-6 lg:mt-10 lg:space-y-7'>
            <header className='text-lg font-semibold text-gray-700 lg:text-2xl'>고객센터</header>
            <section className='space-y-6'>
              <MenuItem name='문의/건의하기' link='/customerService' isOutLink={false}>
                <HelpCircle className='w-6 h-6 text-gray-300' />
              </MenuItem>
              <MenuItem name='서비스 이용약관' link='https://everyanswer.notion.site/671d4d06945140539fc3bdb9539d4c57' isOutLink={true}>
                <CheckSquare className='w-6 h-6 text-gray-300' />
              </MenuItem>
              <MenuItem name='개인정보처리방침' link='https://everyanswer.notion.site/61d8dab6c1334351ad94b705898dd774' isOutLink={true}>
                <Lock className='w-6 h-6 text-gray-300' />
              </MenuItem>
              <MenuItem name='계정 관리' link='/user/management' isOutLink={false}>
                <UserIcon className='w-6 h-6 text-gray-300' />
              </MenuItem>
            </section>
          </article>

          <article className='mt-8 space-y-6 lg:mt-10 lg:space-y-7'>
            <header className='text-lg font-semibold text-gray-700 lg:text-2xl'>기타정보</header>
            <section className='space-y-6'>
              <MenuItem name='공지사항' link='https://everyanswer.notion.site/a52f43fa713d415e8c02a06d3116376a' isOutLink={true}>
                <AlertTriangle className='w-6 h-6 text-gray-300' />
              </MenuItem>
              <div className='w-full flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <GitHub className='w-6 h-6 text-gray-300' />
                  <p className='text-base font-semibold text-gray-600'>앱 버전</p>
                </div>
                <p className='text-base font-semibold text-gray-600 lg:text-xl'><span className='text-sm font-semibold text-blue-500 lg:text-base'>beta </span>{SERVICE_VERSION}</p>
              </div>
            </section>
          </article>
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default User

interface BoxButtonProps {
  children: React.ReactNode
  name: string
  link: string
}
function BoxButton({ children, name, link }: BoxButtonProps) {
  return (
    <Link
      href={link}
      className='grow px-1 py-[1.125rem] flex flex-col items-center justify-center space-y-1.5 rounded-md bg-gray-50 lg:px-6'
    >
      {children}
      <p className='w-[4.375rem] text-center text-xs font-medium text-gray-400 lg:[5.5rem]'>{name}</p>
    </Link>
  )
}

interface Props {
  children: React.ReactNode
  name: string
  link: string
  isOutLink: boolean
}
function MenuItem({ children, name, link, isOutLink }: Props) {
  const wrapCss = 'w-full flex items-center justify-between'
  const inner = (
    <>
      <div className='flex items-center space-x-3'>
        {children}
        <p className='text-base font-semibold text-gray-600 lg:text-xl'>{name}</p>
      </div>
      <ChevronRight className='w-6 h-6 text-gray-800' />
    </>
  )

  if (isOutLink) {
    return (
      <a href={link} className={wrapCss}>
        {inner}
      </a>
    )
  } else {
    return (
      <Link href={link} className={wrapCss}>
        {inner}
      </Link>
    )
  }
}