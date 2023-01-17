import DeptClassTag from '../tag/DeptClassTag'
import { CheckCircle } from 'react-feather'
import Link from 'next/link'
import { QuestionPostType } from '../../utils/types/responseTypes'
import { useEffect, useState } from 'react'
import { getElapsedTime } from '../../utils/functions/getElapsedTime'

interface Props {
  questionPost: QuestionPostType
}

function QuestionPreview({ questionPost }: Props) {
  const { questionPostId, user, deptClass, title, content, createdAt, updatedAt, answerPostsCnt } = questionPost
  const [elapsedTime, setElapsedTime] = useState<string>('0분 전')

  useEffect(() => {
    setElapsedTime(getElapsedTime(createdAt))
  }, [createdAt])

  return (
    <Link
      href={`/question/${questionPostId}`}
      className='block px-5 py-4 rounded-xl bg-gray-50'
    >
      <header className='flex items-center justify-between'>
        <DeptClassTag name={deptClass.name} />
        <p className='text-sm font-semibold text-gray-400 lg:text-base'>{user.nickname} 님</p>
      </header>

      <article className='mt-1.5 space-y-1.5'>
        <h1 className='text-lg font-semibold text-gray-600 lg:text-xl'>{title}</h1>
        <p className='text-base font-medium text-gray-600 truncate'>
          {content}
        </p>
      </article>

      <footer className='mt-4 flex items-center justify-between font-semibold'>
        <p className='text-sm text-gray-400 lg:text-base'>{elapsedTime}</p>
        <div className={'px-1.5 py-1 flex items-center space-x-1 rounded' + (answerPostsCnt > 0 ? ' bg-blue-100 text-blue-500' : ' bg-gray-100 text-gray-500')}>
          <CheckCircle className='w-[1.125rem] h-[1.125rem] lg:w-5 lg:h-5' />
          <p className='text-base'>답변 {answerPostsCnt}</p>
        </div>
      </footer>
    </Link>
  )
}

export default QuestionPreview