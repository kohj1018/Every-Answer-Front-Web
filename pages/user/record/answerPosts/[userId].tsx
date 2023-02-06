import MainContainer from '../../../../components/layout/MainContainer'
import MobileCenterTitleHeader from '../../../../components/layout/mobileHeader/MobileCenterTitleHeader'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Suspense } from 'react'
import { Answer } from '../../../../components/common/Answer'
import { getAnswerPostListByUserId } from '../../../../utils/apis/answerPostsApi'
import { useSnackbarOpenStore } from '../../../../stores/stores'
import Link from 'next/link'

const AnswerPostsRecord = () => {
  const router = useRouter()
  const userId: number = parseInt(router.query.userId as string)
  const { data: answerPostList } = useQuery(
    ['answerPostsWrittenByUser', userId],
    () => getAnswerPostListByUserId(userId),
    {
      enabled: !!userId
    }
  )
  const { setMessage, setIsSnackbarOpen } = useSnackbarOpenStore()

  return (
    <MainContainer isHiddenHeaderAndFooterOnMobile={true}>
      <MobileCenterTitleHeader router={router} title='답변한 글' />

      <main className='marginHeader min-h-screen-except-marginHeight px-5 py-4 space-y-4 bg-gray-50 lg:mainWidthLimit'>
        <Suspense fallback={<p>loading...</p>}>
          {answerPostList?.map((answerPost) =>
            <Link
              href={`/question/${answerPost.questionPostId}`}
              className='block'
            >
              <Answer
                questionPostId={answerPost.questionPostId}
                userId={1}  // TODO : 나중에 이 컴포넌트 자체를 수정해야함 (새로 만들어야함)
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
            </Link>
          )}
        </Suspense>
      </main>
    </MainContainer>
  )
}

export default AnswerPostsRecord