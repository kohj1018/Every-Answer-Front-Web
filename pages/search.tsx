import { NextPage } from 'next'
import MainContainer from '../components/layout/MainContainer'
import MobileCenterTitleHeader from '../components/layout/mobileHeader/MobileCenterTitleHeader'
import SearchBar from '../components/common/SearchBar'
import React, { FormEvent, Suspense, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useScrollYStore, useSnackbarOpen } from '../stores/stores'
import { searchQuestionPostList } from '../utils/apis/questionPostsApi'
import QuestionPreview from '../components/common/QuestionPreview'
import { QuestionPostType } from '../utils/types/responseTypes'
import { router } from 'next/client'
import { arrayIsNotEmpty } from '../utils/functions/arrayIsNotEmpty'

const Search: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  // const [isQueryRun, setIsQueryRun] = useState<boolean>(false) // TODO : react-query로 구현하는 거 다시 시도해보기
  // const { data: searchResult } = useQuery(
  //   ['searchResult', searchTerm],
  //   () => searchQuestionPostList(searchTerm),
  //   {
  //     // enabled: !!searchTerm,  // 검색어 입력안되면 query 호출 X
  //     enabled: isQueryRun,
  //     staleTime: 6 * 10 * 1000,
  //     cacheTime: 6 * 10 * 1000,
  //     onSuccess: () => {
  //       setIsQueryRun(false)
  //     }
  //   }
  // )
  const [searchResult, setSearchResult] = useState<QuestionPostType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpen()

  useEffect(() => {
    if (router.query.searchTerm) {
      setIsLoading(true)
      ;(async () => {
        await searchQuestionPostList(router.query.searchTerm as string)
          .then(async (res) => {
            if (!arrayIsNotEmpty(res)) {
              await setMessage('검색 결과가 없습니다 😥')
              await setIsSnackbarOpen(true)
            }
            setSearchResult(res)
            setSearchTerm(router.query.searchTerm as string)
          })
          .finally(() => setIsLoading(false))
      })()
    }
  }, [router.query.searchTerm])

  // 검색 실행
  const submitSearchTerm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm && searchTerm.replace(/\s/g, '')) {  // 공백만 있는 경우 검색 안함
      router.replace({ query: { searchTerm: searchTerm } })
    }
    // setIsQueryRun(true)
  }

  if (isLoading) return <p>loading...</p>

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader title='검색' />
      <main className='paddingHeader px-5 py-4 lg:py-8 lg:mainWidthLimit'>
        {/* 검색바 */}
        <SearchBar submitSearchTerm={submitSearchTerm} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* 메인 피드 */}
        {arrayIsNotEmpty(searchResult) &&
          <>
            <div className='mt-8 flex items-center space-x-1 lg:mt-12'>
              <h2 className='text-xl font-semibold text-gray-900 lg:text-xl'>Q&A 검색 결과</h2>
              <p className='px-2 rounded-full bg-blue-100 text-center text-base font-semibold text-blue-600'>{searchResult.length}</p>
            </div>
            <section className='mt-4 space-y-2.5 lg:mt-6 lg:space-y-3.5 lg:mt-6'>
              {searchResult.map((questionPost) =>
                <QuestionPreview key={questionPost.questionPostId} questionPost={questionPost} />
              )}
            </section>
          </>
        }
      </main>
    </MainContainer>
  )
}

export default Search