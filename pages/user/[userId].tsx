import React, { Suspense } from 'react'
import {
  AlertCircle,
  CheckCircle,
  Edit3,
  ThumbsUp,
  User as UserIcon,
} from 'react-feather'
import MainContainer from '../../components/layout/MainContainer'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getOtherUserById } from '../../utils/apis/usersApi'
import Link from 'next/link'
import MobileCenterTitleHeader from '../../components/layout/mobileHeader/MobileCenterTitleHeader'

const OtherUser = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)
  const { data: otherUserData } = useQuery(
    ['userInfo', userId],
    () => getOtherUserById(userId),
    {
      enabled: !!userId
    }
  )

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader router={router} title='유저 정보' />

      <main className='marginHeader py-10 px-5 lg:py-20 lg:mainWidthLimit'>
        <Suspense fallback={<p>loading...</p>}>
          <article className='w-full flex flex-col items-center space-y-3'>
            <div className='w-[3.625rem] h-[3.625rem] flex items-center justify-center rounded-full bg-gray-100 lg:w-[5rem] lg:h-[5rem]'>
              <UserIcon className='w-8 h-8 text-gray-400 lg:w-11 lg:h-11' />
            </div>
            <p className='text-lg font-semibold text-gray-900 lg:text-2xl'>{otherUserData?.nickname}</p>
          </article>

          <article className='mt-8 py-6 grid grid-cols-[128px_1fr] gap-y-[1.125rem] text-gray-800 border-y border-gray-100 lg:mt-20 lg:grid-cols-[300px_1fr]'>
            <p className='text-sm font-semibold lg:text-lg'>전공분류</p>
            <p className='text-base font-medium lg:text-xl'>{otherUserData?.deptClass.name}</p>
            <p className='text-sm font-semibold lg:text-lg'>대학</p>
            <p className='text-base font-medium lg:text-xl'>{otherUserData?.univ}</p>
            <p className='text-sm font-semibold lg:text-lg'>전공</p>
            <p className='text-base font-medium lg:text-xl'>{otherUserData?.deptName}</p>
            <p className='text-sm font-semibold lg:text-lg'>학번</p>
            <p className='text-base font-medium lg:text-xl'>{otherUserData?.entranceYear.toString().padStart(2, '0')}학번</p>
          </article>

          <article className='mt-6 w-full flex justify-between gap-x-2 lg:mt-10 lg:gap-x-3.5'>
            <BoxButton name='작성한 글' link='/'>
              <Edit3 className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <BoxButton name='답변한 글' link='/'>
              <CheckCircle className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <BoxButton name='좋아요한 글' link='/'>
              <ThumbsUp className='w-5 h-5 text-gray-600' />
            </BoxButton>
            <Link
              href={{
                pathname: '/customerService',
                query: {
                  type: '신고',
                  reportType: '유저',
                  reportedId: otherUserData?.userId,
                  reportedInfo: otherUserData?.nickname
                }
              }}
              className='grow px-1 py-[1.125rem] flex flex-col items-center justify-center space-y-1.5 rounded-md bg-gray-50 lg:px-6'
            >
              <AlertCircle className='w-5 h-5 text-gray-600' />
              <p className='w-[4.375rem] text-center text-xs font-medium text-gray-400 lg:[5.5rem]'>신고하기</p>
            </Link>
          </article>
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default OtherUser


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