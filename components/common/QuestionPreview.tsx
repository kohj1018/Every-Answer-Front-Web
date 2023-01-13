import DeptClassTag from '../tag/DeptClassTag'
import { CheckCircle } from 'react-feather'
import Link from 'next/link'

function QuestionPreview() {
  return (
    <Link href='/' className='block px-5 py-4 rounded-xl bg-gray-50'>
      <header className='flex items-center justify-between'>
        <DeptClassTag />
        <p className='text-xs font-semibold text-gray-400'>두아리파님</p>
      </header>

      <article className='mt-1.5 space-y-1.5'>
        <h1 className='text-sm font-semibold text-gray-600'>아두이노 코딩 질문</h1>
        <p className='text-xs font-medium text-gray-600 truncate'>
          안녕하세요, 아두이노 코드를 짜는데 이 부분 코드가 도저히 안되네요. 서지윤 바보
        </p>
      </article>

      <footer className='mt-4 flex items-center justify-between'>
        <p className='text-xs font-semibold text-gray-400'>3분 전</p>
        <div className='px-1.5 py-1 flex items-center space-x-1 rounded bg-blue-100 text-blue-500'>
          <CheckCircle className='w-3.5 h-3.5' />
          <p className='text-xs font-semibold text-blue-500'>답변 4</p>
        </div>
      </footer>
    </Link>
  )
}

export default QuestionPreview