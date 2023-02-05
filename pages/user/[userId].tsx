import { Suspense, useState } from 'react'
import {
  CheckCircle,
  Edit3, MoreHorizontal,
  ThumbsUp,
  User as UserIcon,
} from 'react-feather'
import MainContainer from '../../components/layout/MainContainer'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { getOtherUserById } from '../../utils/apis/usersApi'
import Link from 'next/link'
import { Menu, MenuItem } from '@mui/material'
import MobileBackHeaderWithBtn from '../../components/layout/mobileHeader/MobileBackHeaderWithBtn'

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileBackHeaderWithBtn router={router} title='유저 정보'>
        <MenuItem
          onClick={() => router.push({
            pathname: '/customerService',
            query: {
              type: '신고',
              reportType: '유저',
              reportedId: otherUserData?.userId,
              reportedInfo: otherUserData?.nickname
            }
          })}
        >
          신고하기
        </MenuItem>
        <MenuItem>차단하기</MenuItem>
      </MobileBackHeaderWithBtn>

      <main className='marginHeader py-10 px-5 lg:py-12 lg:mainWidthLimit'>
        <Suspense fallback={<p>loading...</p>}>
          <article className='relative w-full flex flex-col items-center space-y-3 z-0 lg:pt-8'>
            <button onClick={(e) => setAnchorEl(e.currentTarget)} className='hidden absolute top-0 right-0 lg:inline-block'>
              <MoreHorizontal className='w-7 h-7 text-gray-400' />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem
                onClick={() => router.push({
                  pathname: '/customerService',
                  query: {
                    type: '신고',
                    reportType: '유저',
                    reportedId: otherUserData?.userId,
                    reportedInfo: otherUserData?.nickname
                  }
                })}
              >
                신고하기
              </MenuItem>
              <MenuItem>차단하기</MenuItem>
            </Menu>

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