import { NextPage } from 'next'
import MobileCancelHeader from '../components/layout/mobileHeader/MobileCancelHeader'
import MainContainer from '../components/layout/MainContainer'
import React, { useState } from 'react'
import { ChevronLeft } from 'react-feather'
import { useMutation, useQueryClient } from 'react-query'
import { questionPostsApi } from '../utils/api'

const AddQuestion: NextPage = () => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const questionPostMutation = useMutation(questionPostsApi.addQuestionPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('infiniteQuestionPosts')
      alert('등록 성공!')
    }
  })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.defaultPrevented
    questionPostMutation.mutate({
      userId: 1,
      deptId: 1,
      title: title,
      content: content
    })
  }

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCancelHeader title='질문하기' />

      <main className='mt-8 px-5 lg:mt-12 lg:mainWidthLimit'>
        <article className='hidden items-center space-x-1 lg:flex'>
          <ChevronLeft className='w-3 h-3 text-gray-400' />
          <p className='text-xs font-bold text-gray-500'>홈</p>
          <ChevronLeft className='w-3 h-3 text-gray-400' />
          <p className='text-xs font-bold text-gray-500'>질문하기</p>
        </article>

        <input
          type='text'
          className={'w-full py-2 border-b border-gray-200 text-lg font-semibold text-gray-600 placeholder:text-gray-400 focus:outline-none'
        + ' lg:mt-8 lg:py-4 lg:text-2xl'}
          placeholder='제목을 입력하세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
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