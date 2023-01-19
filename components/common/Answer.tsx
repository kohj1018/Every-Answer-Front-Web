import { useState } from 'react'
import { ThumbsUp } from 'react-feather'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import Link from 'next/link'

interface Props {
  userId: number
  nickname: string
  deptName: string
  likeNum: number
  content: string
  createdAt: string
  updatedAt: string | null
}

function Answer({ userId, nickname, deptName, likeNum, content, createdAt, updatedAt }: Props) {
  return (
    <article className='p-4 space-y-3.5 bg-white lg:px-5 lg:py-6 lg:space-y-4'>
      <header className='pb-3.5 flex items-center justify-between border-b border-gray-200'>
        <Link href='/' className='space-y-0.5 text-sm lg:text-lg'>
          <p className='font-semibold text-gray-600'>{nickname}</p>
          <p className='font-medium text-gray-400'>{deptName}</p>
        </Link>

        <button className={'px-1.5 py-1 flex items-center space-x-1 rounded' + (likeNum > 0 ? ' bg-blue-100 text-blue-500' : ' bg-gray-100 text-gray-500')}>
          <p className='text-base font-semibold lg:text-lg'>유용해요 {likeNum}</p>
          <ThumbsUp className='w-[1.125rem] h-[1.125rem] lg:w-5 lg:h-5' />
        </button>
      </header>

      <p className='text-base font-medium text-gray-600 lg:text-lg'>{content}</p>

      <footer className='text-sm font-semibold text-gray-400 lg:text-lg'>{getElapsedTime(dayjs(createdAt))}</footer>
    </article>
  )
}

export default Answer