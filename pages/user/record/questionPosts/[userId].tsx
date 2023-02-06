import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getQuestionPostListByUserId } from '../../../../utils/apis/questionPostsApi'
import MainContainer from '../../../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../../../components/layout/mobileHeader/MobileCenterTitleHeader'
import { Suspense } from 'react'
import Link from 'next/link'
import QuestionPreview from '../../../../components/common/QuestionPreview'

const QuestionPostsRecord = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)
  const { data: questionPostList } = useQuery(
    ['questionPostsWrittenByUser', userId],
    () => getQuestionPostListByUserId(userId),
    {
      enabled: !!userId
    }
  )

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader router={router} title='질문한 글' />

      <main className='marginHeader px-5 py-4 space-y-4 lg:mainWidthLimit'>
        <Suspense fallback={<p>loading...</p>}>
          {questionPostList?.map((questionPost) =>
            <Link
              key={questionPost.questionPostId}
              href={`/question/${questionPost.questionPostId}`}
            >
              <QuestionPreview questionPost={questionPost} />
            </Link>
          )}
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default QuestionPostsRecord