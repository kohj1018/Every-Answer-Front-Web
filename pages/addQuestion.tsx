import { NextPage } from 'next'
import MobileCancelHeader from '../components/layout/mobileHeader/MobileCancelHeader'
import MainContainer from '../components/layout/MainContainer'
import React, { useEffect, useState } from 'react'
import { ChevronLeft } from 'react-feather'
import { useMutation, useQueryClient } from 'react-query'
import { addQuestionPost } from '../utils/apis/questionPostsApi'
import { useSnackbarOpen } from '../stores/stores'
import { useRouter } from 'next/router'
import { useSignInInfoStore } from '../stores/localStorageStore/stores'

const AddQuestion: NextPage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { userId, oauthId } = useSignInInfoStore()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { setIsSnackbarOpen, setMessage } = useSnackbarOpen()

  const questionPostMutation = useMutation(addQuestionPost, {
    onSuccess: async () => {
      queryClient.invalidateQueries('infiniteQuestionPosts')
      await setMessage('질문을 등록했어요!')
      await setIsSnackbarOpen(true)
      router.back()
    }
  })

  // 로그인하지 않은 경우 Redirect
  useEffect(() => {
    if (!userId || !oauthId) {
      ;(async () => {
        await setMessage('로그인 후 이용해주세요!')
        await setIsSnackbarOpen(true)
        await router.replace('/auth/signIn')
      })()
    }
  }, [userId, oauthId])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (userId && oauthId) {
      questionPostMutation.mutate({
        userId: userId,
        deptId: 1,  // TODO: 이거 나중에 수정해야됨
        title: title,
        content: content
      })
    }
  }

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCancelHeader title='질문하기' />

      <main className='paddingHeader px-5 py-8 lg:py-12 lg:mainWidthLimit'>
        <article className='hidden items-center space-x-1 lg:flex'>
          <ChevronLeft className='w-3 h-3 text-gray-400' />
          <p className='text-xs font-bold text-gray-500'>홈</p>
          <ChevronLeft className='w-3 h-3 text-gray-400' />
          <p className='text-xs font-bold text-gray-500'>질문하기</p>
        </article>

        {/* 질문 제목 */}
        <input
          type='text'
          className={'w-full py-2 border-b border-gray-200 text-lg font-semibold text-gray-600 placeholder:text-gray-400 focus:outline-none'
        + ' lg:mt-8 lg:py-4 lg:text-2xl'}
          placeholder='제목을 입력하세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {/* 질문 내용 */}
        <textarea
          className={'mt-4 w-full h-[65vh] text-base font-semibold text-gray-600 placeholder:text-gray-300 focus:outline-none scrollbar-hide'
        + ' lg:mt-6 lg:text-lg'}
          placeholder='질문을 남겨보세요.'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className='mt-4 w-full py-4 rounded-lg bg-blue-500 text-base font-bold text-white shadow-button'
        >
          등록하기
        </button>
      </main>
    </MainContainer>
  )
}

export default AddQuestion