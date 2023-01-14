import { NextPage } from 'next'
import SearchBtn from '../components/layout/SearchBtn'
import { ChevronDown } from 'react-feather'
import QuestionPreview from '../components/common/QuestionPreview'
import MainContainer from '../components/layout/MainContainer'
import { DESKTOP_MAX_WIDTH } from '../utils/constant/systemConstants'

const Home: NextPage = () => {
  return (
    <MainContainer>
      <main className={'px-5 pt-5 space-y-6 lg:mainWidthLimit'}>
        {/* 검색바 */}
        <SearchBtn />

        {/* 메인 피드 */}
        <div className='space-y-3'>
          <header className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-gray-900'>Q&A</h2>
            {/*<button className='pl-3 pr-1.5 py-1 flex items-center rounded bg-white border border-gray-200'>*/}
            {/*  <p className='text-xs font-semibold text-gray-400'>최신순</p>*/}
            {/*  <ChevronDown className='w-3.5 h-3.5 text-gray-400' />*/}
            {/*</button>*/}
          </header>

          <section className='space-y-2.5 lg:space-y-3.5'>
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
            <QuestionPreview />
          </section>
        </div>
      </main>
    </MainContainer>
  )
}

export default Home