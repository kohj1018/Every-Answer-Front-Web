import { NextPage } from 'next'
import { Edit3 } from 'react-feather'
import QuestionPreview from '../components/common/QuestionPreview'
import MainContainer from '../components/layout/MainContainer'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <MainContainer>
      <main className='pt-8 px-5 lg:pt-12 lg:mainWidthLimit'>
        {/* 메인 피드 */}
        <h2 className='text-xl font-semibold text-gray-900'>Q&A</h2>
        <section className='mt-4 space-y-2.5 lg:mt-6 lg:space-y-3.5'>
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
          <QuestionPreview />
        </section>
      </main>

      {/* 질문하기 FAB */}
      <Link
        href='addQuestion'
        className={'fixed bottom-6 moveToCenter px-4 py-2 flex items-center justify-center space-x-1 bg-white rounded-3xl border-2 border-gray-300 shadow-floating-action-btn lg:bottom-24'
      + ' lg:px-20 lg:py-3'}
      >
        <Edit3 className='w-5 h-5 text-blue-500' />
        <p className='text-base font-semibold text-gray-500 lg:text-xl'>질문하기</p>
      </Link>
    </MainContainer>
  )
}

export default Home