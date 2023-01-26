import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../components/layout/MainContainer'
import MobileBackHeader from '../../components/layout/mobileHeader/MobileBackHeader'
import DeptClassTag from '../../components/tag/DeptClassTag'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'
import { AnswerPostType, QuestionPostType } from '../../utils/types/responseTypes'
import Link from 'next/link'
import React, { Suspense } from 'react'
import { getQuestionPostById } from '../../utils/apis/questionPostsApi'
import { getAnswerPostListByQuestionPostId } from '../../utils/apis/answerPostsApi'
import { Answer, AnswerWithoutUserInfo } from '../../components/common/Answer'
import { ChevronLeft } from 'react-feather'
import { useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSnackbarOpenStore } from '../../stores/stores'


const QuestionPost: NextPage = () => {
  const router = useRouter()
  const userId = useSignInInfoStore(state => state.userId)
  const questionPostId: number = parseInt(router.query.questionPostId as string ?? '1')
  const { data: questionPost, isLoading: isQuestionPostLoading } = useQuery<QuestionPostType>(['questionPost', questionPostId], () => getQuestionPostById(questionPostId))
  const { data: answerPostList, isLoading: isAnswerPostLoading } = useQuery<AnswerPostType[]>(['answerPostList', questionPostId], () => getAnswerPostListByQuestionPostId(questionPostId))
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()



  if (isQuestionPostLoading || isAnswerPostLoading) return <p>loaindg...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileBackHeader router={router} title='홈' />

      <main className='marginHeader'>
        {/* 질문 글 */}
        <Suspense fallback={<p>loading...</p>}>
          <article className='px-5 py-6 bg-white lg:py-12 lg:mainWidthLimit'>
            <article className='hidden pb-8 items-center space-x-1 lg:flex'>
              <ChevronLeft className='w-3 h-3 text-gray-400' />
              <p className='text-xs font-bold text-gray-500'>홈</p>
              <ChevronLeft className='w-3 h-3 text-gray-400' />
              <p className='text-xs font-bold text-gray-500'>Q&A 상세페이지</p>
            </article>

            {questionPost &&
              <DeptClassTag name={questionPost.deptClass.name} />
            }
            <h1 className='mt-3 text-lg font-semibold text-gray-600 lg:mt-4 lg:text-2xl'>{questionPost?.title}</h1>
            <p className='mt-2 text-base font-medium text-gray-600 lg:text-lg'>{questionPost?.content}</p>
            <div className='mt-6 flex items-center justify-between text-sm font-semibold text-gray-400 lg:mt-8 lg:text-lg'>
              <p>{questionPost?.user.nickname} 님</p>
              <p>{dayjs(questionPost?.createdAt).format('YY.MM.DD')}</p>
            </div>
          </article>
        </Suspense>

        {/* 답변 영역 */}
        <Suspense fallback={<p>loading...</p>}>
          <section className='px-5 py-6 bg-gray-50 lg:mainWidthLimit'>
            {/* 답변 유도 버튼 */}
            <article className='px-4 py-3 flex items-center justify-between rounded bg-gray-100 lg:px-6 lg:py-5'>
              <p className='text-base font-semibold text-gray-400 lg:text-lg'>답변을 달아주세요!</p>
              <Link
                href={{
                  pathname: '/addAnswer',
                  query: {
                    questionPostId: questionPostId,
                    deptClassName: questionPost?.deptClass.name,
                    questionTitle: questionPost?.title,
                    questionContent: questionPost?.content,
                    questionUserNickname: questionPost?.user.nickname,
                    questionCreatedAt: questionPost?.createdAt
                  }
                }}
                className='px-3 py-2 rounded bg-green-500 text-center'
              >
                <p className='text-sm text-semibold text-gray-50 lg:text-lg'>답변하기</p>
              </Link>
            </article>

            {/* 답변 글들 */}
            <section className='mt-6'>
              <header className='flex items-center space-x-1.5'>
                <p className='text-lg font-semibold text-gray-900 lg:text-2xl'>답변</p>
                <p className='px-1.5 py-0.5 rounded-full bg-blue-100 text-center text-xs font-semibold text-blue-600 lg:px-3 lg:text-lg'>{questionPost?.answerPostsCnt}</p>
              </header>


              <section className='mt-3 space-y-3 lg:mt-6 lg:space-y-4'>
                {userId ? (
                  answerPostList?.map((answerPost) =>
                    <Answer
                      key={answerPost.answerPostId}
                      questionPostId={answerPost.questionPostId}
                      answerPostId={answerPost.answerPostId}
                      userId={userId}
                      authorId={answerPost.user.userId}
                      nickname={answerPost.user.nickname}
                      deptName={answerPost.user.deptName}
                      likeNum={answerPost.likeNum}
                      content={answerPost.content}
                      createdAt={answerPost.createdAt}
                      updatedAt={answerPost.updatedAt}
                      setMessage={setMessage}
                      setIsSnackbarOpen={setIsSnackbarOpen}
                    />
                  )
                ) : (
                  answerPostList?.map((answerPost) =>
                    <AnswerWithoutUserInfo
                      key={answerPost.answerPostId}
                      answerPostId={answerPost.answerPostId}
                      authorId={answerPost.user.userId}
                      nickname={answerPost.user.nickname}
                      deptName={answerPost.user.deptName}
                      likeNum={answerPost.likeNum}
                      content={answerPost.content}
                      createdAt={answerPost.createdAt}
                      updatedAt={answerPost.updatedAt}
                      setMessage={setMessage}
                      setIsSnackbarOpen={setIsSnackbarOpen}
                    />
                  )
                )}
              </section>
            </section>
          </section>
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default QuestionPost