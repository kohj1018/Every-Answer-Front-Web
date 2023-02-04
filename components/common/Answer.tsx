import React, { useState } from 'react'
import { ThumbsUp } from 'react-feather'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'
import dayjs from 'dayjs'
import Link from 'next/link'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
  addLikeLogAnswerPost,
  deleteLikeLogAnswerPost,
  getLikeLogAnswerPost,
} from '../../utils/apis/likeLog/answerPostLikeLogApi'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useRouter } from 'next/router'

interface AnswerProps extends AnswerWithoutUserInfoProps {
  questionPostId: number
  userId: number  // 현재 사용자 아이디
}

export function Answer({ questionPostId, answerPostId, userId, authorId, nickname, deptName, likeNum, content, createdAt, updatedAt, setMessage, setIsSnackbarOpen }: AnswerProps) {
  const queryClient = useQueryClient()
  const [tempLikeNum, setTempLikeNum] = useState<number>(likeNum)
  const { data: isUserLike } = useQuery<boolean>(['likeLogAnswerPost', answerPostId, userId], () => getLikeLogAnswerPost(answerPostId, userId))
  const addLikeLogMutation = useMutation(addLikeLogAnswerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['answerPostList', questionPostId])
      await queryClient.invalidateQueries(['likeLogAnswerPost', answerPostId, userId])
      setTempLikeNum(tempLikeNum + 1)
      await setMessage('답변글을 추천했어요 👍')
      await setIsSnackbarOpen(true)
    }
  })
  const deleteLikeLogMutation = useMutation(deleteLikeLogAnswerPost, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['answerPostList', questionPostId])
      await queryClient.invalidateQueries(['likeLogAnswerPost', answerPostId, userId])
      setTempLikeNum(tempLikeNum - 1)
      await setMessage('추천을 취소했어요')
      await setIsSnackbarOpen(true)
    }
  })

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (userId === authorId) {  // 만약 답변글 작성자와 추천 누르는 사람이 같은 사람이라면 -> 에러
      await setMessage('자신이 작성한 글은 추천할 수 없어요 😅')
      await setIsSnackbarOpen(true)
    } else if (isUserLike) {  // 이미 추천 눌러있는 경우
      deleteLikeLogMutation.mutate({
        answerPostId: answerPostId,
        userId: userId,
      })
    } else {  // 처음 추천 누르는 경우
      addLikeLogMutation.mutate({
        answerPostId: answerPostId,
        userId: userId
      })
    }
  }

  return (
    <article className='p-4 space-y-3.5 bg-white lg:px-5 lg:py-6 lg:space-y-4'>
      <header className='pb-3.5 flex items-center justify-between border-b border-gray-200'>
        <Link href={`/user/${authorId}`} className='space-y-0.5 text-sm lg:text-lg'>
          <p className='font-semibold text-gray-600'>{nickname}</p>
          <p className='font-medium text-gray-400'>{deptName}</p>
        </Link>

        <button
          onClick={(e) => handleLike(e)}
          className={'px-1.5 py-1 flex items-center space-x-1 rounded' + (isUserLike ? ' bg-blue-100 text-blue-500' : ' bg-gray-100 text-gray-500')}
        >
          <p className='text-base font-semibold lg:text-lg'>유용해요 {tempLikeNum}</p>
          <ThumbsUp className='w-[1.125rem] h-[1.125rem] lg:w-5 lg:h-5' />
        </button>
      </header>

      <p className='text-base font-medium text-gray-600 lg:text-lg'>{content}</p>

      <footer className='w-full flex items-center justify-between'>
        <p className='text-sm font-semibold text-gray-400 lg:text-lg'>
          {getElapsedTime(dayjs(createdAt))}
        </p>
        <Link
          href={{
            pathname: '/customerService',
            query: {
              type: '신고',
              reportType: '답변글',
              reportedId: answerPostId,
              reportedInfo: content
            }
          }}
          className='text-sm font-bold text-gray-300 lg:text-base'
        >
          신고하기
        </Link>
      </footer>
    </article>
  )
}

interface AnswerWithoutUserInfoProps {
  answerPostId: number
  authorId: number  // 답변글 작성자 아이디
  nickname: string
  deptName: string
  likeNum: number
  content: string
  createdAt: string
  updatedAt: string | null
  setMessage: (message: string) => void
  setIsSnackbarOpen: (isSnackbarOpen: boolean) => void
}

export function AnswerWithoutUserInfo({ answerPostId, authorId, nickname, deptName, likeNum, content, createdAt, updatedAt, setMessage, setIsSnackbarOpen }: AnswerWithoutUserInfoProps) {
  const router = useRouter()

  const redirectPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await setMessage('로그인 후 이용하실 수 있습니다.')
    await setIsSnackbarOpen(true)
    await router.replace('/auth/signIn')
  }

  return (
    <article className='p-4 space-y-3.5 bg-white lg:px-5 lg:py-6 lg:space-y-4'>
      <header className='pb-3.5 flex items-center justify-between border-b border-gray-200'>
        <Link href={`/user/${authorId}`} className='space-y-0.5 text-sm lg:text-lg'>
          <p className='font-semibold text-gray-600'>{nickname}</p>
          <p className='font-medium text-gray-400'>{deptName}</p>
        </Link>
        <button
          onClick={(e) => redirectPage(e)}
          className='px-1.5 py-1 flex items-center space-x-1 rounded bg-gray-100 text-gray-500'
        >
          <p className='text-base font-semibold lg:text-lg'>유용해요 {likeNum}</p>
          <ThumbsUp className='w-[1.125rem] h-[1.125rem] lg:w-5 lg:h-5' />
        </button>
      </header>

      <p className='text-base font-medium text-gray-600 lg:text-lg'>{content}</p>

      <footer className='w-full flex items-center justify-between'>
        <p className='text-sm font-semibold text-gray-400 lg:text-lg'>
          {getElapsedTime(dayjs(createdAt))}
        </p>
        <button className='text-sm font-bold text-gray-300 lg:text-base'>
          신고하기
        </button>
      </footer>
    </article>
  )
}