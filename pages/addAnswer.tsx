import { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MobileCancelHeader from '../components/layout/mobileHeader/MobileCancelHeader'
import DeptClassTag from '../components/tag/DeptClassTag'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import { Image, ChevronLeft, FileText } from 'react-feather'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { addAnswerPost } from '../utils/apis/answerPostsApi'

const AddAnswer: NextPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const questionPostId: number = parseInt(router.query.questionPostId as string)
  const deptClassName: string = router.query.deptClassName as string
  const questionTitle: string = router.query.questionTitle as string
  const questionContent: string = router.query.questionContent as string
  const questionUserNickname: string = router.query.questionUserNickname as string
  const questionCreatedAt: string = router.query.questionCreatedAt as string
  const [answerContent, setAnswerContent] = useState('')

  const answerPostMutation = useMutation(addAnswerPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['answerPostList', questionPostId])
      alert('등록 성공!')
    }
  })

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.defaultPrevented
    answerPostMutation.mutate({
      questionPostId: questionPostId,
      userId: 2,  // TODO: 이거 나중에 수정해야됨 (로그인 구현하면)
      likeNum: 0,
      content: answerContent
    })
  }

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCancelHeader title='답변하기' />
      <main className='paddingHeader bg-gray-100'>
        <article className='px-5 py-6 border-b border-gray-100 bg-white lg:py-12 lg:mainWidthLimit'>
          <article className='hidden mb-14 items-center space-x-1 lg:flex'>
            <ChevronLeft className='w-3 h-3 text-gray-400' />
            <p className='text-xs font-bold text-gray-500'>홈</p>
            <ChevronLeft className='w-3 h-3 text-gray-400' />
            <p className='text-xs font-bold text-gray-500'>Q&A 상세페이지</p>
            <ChevronLeft className='w-3 h-3 text-gray-400' />
            <p className='text-xs font-bold text-gray-500'>답변하기</p>
          </article>

          {/* 질문 내용 */}
          <DeptClassTag name={deptClassName} />
          <h1 className='mt-3 text-lg font-semibold text-gray-600 lg:mt-4 lg:text-2xl'>{questionTitle}</h1>
          <p className='mt-2 text-base font-medium text-gray-600 lg:text-lg'>{questionContent}</p>
          <footer className='mt-6 flex items-center justify-between text-sm font-semibold text-gray-400 lg:mt-8 lg:text-lg'>
            <p>{questionUserNickname} 님</p>
            <p>{dayjs(questionCreatedAt).format('YY.MM.DD')}</p>
          </footer>
        </article>

        {/* 답변 작성 부분 */}
        <article className='mt-2 bg-white'>
          <div className='border-b border-gray-100'>
            <section className='px-5 py-4 flex items-center space-x-4 lg:mainWidthLimit'>
              <button className='flex items-center space-x-1.5'>
                <Image className='w-6 h-6 text-gray-600' />
                <p className='text-sm font-semibold text-gray-400 lg:text-lg'>사진첨부</p>
              </button>
              <button className='flex items-center space-x-1.5'>
                <FileText className='w-6 h-6 text-gray-600' />
                <p className='text-sm font-semibold text-gray-400 lg:text-lg'>파일첨부</p>
              </button>
            </section>
          </div>

          <form className='px-5 py-6 lg:py-8 lg:mainWidthLimit'>
            <textarea
              className='w-full h-[65vh] text-base font-semibold text-gray-600 placeholder:text-gray-300 focus:outline-none scrollbar-hide lg:text-lg'
              placeholder='답변 작성 시 서비스 운영정책을 지켜주세요.'
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              required
            />
            <button
              onClick={(e) => handleSubmit(e)}
              className='mt-4 w-full py-4 rounded-lg bg-green-500 text-base font-bold text-white shadow-button lg:text-lg'
            >
              등록하기
            </button>
          </form>
        </article>
      </main>
    </MainContainer>
  )
}

export default AddAnswer