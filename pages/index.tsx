import { NextPage } from 'next'
import { Edit3 } from 'react-feather'
import QuestionPreview from '../components/common/QuestionPreview'
import MainContainer from '../components/layout/MainContainer'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { useEffect } from 'react'
import React from 'react'
import { ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID } from '../utils/config'
import { getInfiniteQuestionPostList } from '../utils/apis/questionPostsApi'
import { useScrollYStore } from '../stores/stores'

const Home: NextPage = () => {
  const { ref, inView } = useInView()
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    'infiniteQuestionPosts',
    ({ pageParam = ARBITRARY_LARGEST_LAST_QUESTIONPOST_ID }) => getInfiniteQuestionPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextLastPostId : undefined
    }
  )
  const scrollY = useScrollYStore(state => state.scrollY) // 스크롤 위치 저장

  // 바닥에 닿으면 새로 불러오기
  useEffect(() => {
    if (inView) fetchNextPage()
  }, [inView])

  // 스크롤 위치 유지
  useEffect(() => {
    // 기본값이 "0"이기 때문에 스크롤 값이 저장됐을 때에만 window를 스크롤 시킴
    if (scrollY.toString() !== '0') window.scrollTo(0, Number(scrollY))
  }, [])


  if (isLoading) return <p>loading...</p>
  if (isError) return <p>Error!</p>

  return (
    <MainContainer>
      <main className='paddingHeader pt-8 px-5 lg:pt-12 lg:mainWidthLimit'>
        {/* 메인 피드 */}
        <h2 className='text-xl font-semibold text-gray-900'>Q&A</h2>
        <section className='mt-4 space-y-2.5 lg:mt-6 lg:space-y-3.5'>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.postList.map((questionPost) =>
                <QuestionPreview key={questionPost.questionPostId} questionPost={questionPost} />
              )}
            </React.Fragment>
          ))}
        </section>

        {/* 무한 스크롤 옵저버 */}
        {isFetchingNextPage ? <p>loading...</p> : <div ref={ref}></div>}
      </main>

      {/* 질문하기 FAB */}
      <Link
        href='addQuestion'
        className={'fixed bottom-6 moveToXaxisCenter px-4 py-2 flex items-center justify-center space-x-1 bg-white rounded-3xl border-2 border-gray-300 shadow-floating-action-btn lg:bottom-24 lg:px-20 lg:py-3'}
      >
        <Edit3 className='w-5 h-5 text-blue-500' />
        <p className='text-base font-semibold text-gray-500 lg:text-xl'>질문하기</p>
      </Link>
    </MainContainer>
  )
}

export default Home