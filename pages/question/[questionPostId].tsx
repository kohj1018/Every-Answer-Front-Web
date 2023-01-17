import { NextPage } from 'next'
import { useRouter } from 'next/router'

const QuestionPost: NextPage = () => {
  const router = useRouter()
  const questionPostId: number = parseInt(router.query.questionPostId as string)

  return (
    <p>
      {questionPostId}
    </p>
  )
}

export default QuestionPost