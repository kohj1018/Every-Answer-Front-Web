import { NextPage } from 'next'
import { useRouter } from 'next/router'
import MainContainer from '../../components/layout/MainContainer'
import MobileBackHeaderWithBtn from '../../components/layout/mobileHeader/MobileBackHeaderWithBtn'
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
import { useBlockUserIdListStore, useSignInInfoStore } from '../../stores/localStorageStore/stores'
import { useSnackbarOpenStore } from '../../stores/stores'
import { MenuItem } from '@mui/material'


const QuestionPost: NextPage = () => {
  const router = useRouter()
  const userId = useSignInInfoStore(state => state.userId)
  const questionPostId: number = parseInt(router.query.questionPostId as string)
  const { data: questionPost, isLoading: isQuestionPostLoading } = useQuery<QuestionPostType>(
    ['questionPost', questionPostId],
    () => getQuestionPostById(questionPostId),
    {
      enabled: !!questionPostId
    }
  )
  const { data: answerPostList, isLoading: isAnswerPostLoading } = useQuery<AnswerPostType[]>(
    ['answerPostList', questionPostId],
    () => getAnswerPostListByQuestionPostId(questionPostId),
    {
      enabled: !!questionPostId
    }
  )
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()
  const blockUserIdList = useBlockUserIdListStore(state => state.blockUserIdList)


  if (isQuestionPostLoading || isAnswerPostLoading) return <p>loading...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileBackHeaderWithBtn router={router} title='홈'>
        <MenuItem
          onClick={() => router.push({
            pathname: '/customerService',
            query: {
              type: '신고',
              reportType: '질문글',
              reportedId: questionPostId,
              reportedInfo: questionPost?.title
            }
          })}
        >
          신고하기
        </MenuItem>
      </MobileBackHeaderWithBtn>

      <main className='marginHeader min-h-screen-except-marginHeader flex flex-col'>
        {/* 질문 글 */}
        <Suspense fallback={<p>loading...</p>}>
          <article className='px-5 py-6 bg-white lg:py-12 lg:mainWidthLimit'>
            <div className='hidden pb-8 items-center justify-between lg:flex'>
              <article className='flex items-center space-x-1'>
                <ChevronLeft className='w-3 h-3 text-gray-400' />
                <p className='text-xs font-bold text-gray-500'>홈</p>
                <ChevronLeft className='w-3 h-3 text-gray-400' />
                <p className='text-xs font-bold text-gray-500'>Q&A 상세페이지</p>
              </article>
              <Link
                href={{
                  pathname: '/customerService',
                  query: {
                    type: '신고',
                    reportType: '질문글',
                    reportedId: questionPostId,
                    reportedInfo: questionPost?.title
                  }
                }}
                className='text-base font-bold text-gray-300'
              >
                신고하기
              </Link>
            </div>

            {questionPost &&
              <DeptClassTag name={questionPost.deptClass.name} />
            }
            <h1 className='mt-3 text-lg font-semibold text-gray-600 lg:mt-4 lg:text-2xl'>{questionPost?.title}</h1>
            <p className='mt-2 text-base font-medium text-gray-600 lg:text-lg'>{questionPost?.content}</p>
            <div className='mt-6 flex items-center justify-between text-sm font-semibold text-gray-400 lg:mt-8 lg:text-lg'>
              <Link href={`/user/${questionPost?.user.userId}`}>{questionPost?.user.nickname} 님</Link>
              <p>{dayjs(questionPost?.createdAt).format('YY.MM.DD')}</p>
            </div>
          </article>
        </Suspense>

        {/* 답변 영역 */}
        <Suspense fallback={<p>loading...</p>}>
          <section className='grow px-5 py-6 bg-gray-50 lg:mainWidthLimit'>
            {/* 답변 유도 버튼 */}
            {userId !== questionPost?.user.userId &&
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
            }

            {/* 답변 글들 */}
            <section className='mt-6'>
              <header className='flex items-center space-x-1.5'>
                <p className='text-lg font-semibold text-gray-900 lg:text-2xl'>답변</p>
                <p className='px-1.5 py-0.5 rounded-full bg-blue-100 text-center text-xs font-semibold text-blue-600 lg:px-3 lg:text-lg'>{questionPost?.answerPostsCnt}</p>
              </header>


              <section className='mt-3 space-y-3 lg:mt-6 lg:space-y-4'>
                {answerPostList?.map((answerPost) => {
                  const isBlock = blockUserIdList.includes(answerPost.user.userId)
                  if (!!userId) {
                    return (
                      <Answer
                        key={answerPost.answerPostId}
                        questionPostId={answerPost.questionPostId}
                        answerPostId={answerPost.answerPostId}
                        userId={userId}
                        authorId={answerPost.user.userId}
                        nickname={isBlock ? '차단한 사용자' : answerPost.user.nickname}
                        deptName={isBlock ? '' : answerPost.user.deptName}
                        likeNum={answerPost.likeNum}
                        content={isBlock ? '차단한 사용자의 글입니다.' : answerPost.content}
                        createdAt={answerPost.createdAt}
                        updatedAt={answerPost.updatedAt}
                        setMessage={setMessage}
                        setIsSnackbarOpen={setIsSnackbarOpen}
                      />
                    )
                  } else {
                    return (
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
                  }
                })}
              </section>
            </section>
          </section>
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default QuestionPost