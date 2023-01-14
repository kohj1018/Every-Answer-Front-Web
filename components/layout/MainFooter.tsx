import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import SearchBtn from './SearchBtn'
import { ArrowUpRight, Search } from 'react-feather'
import Link from 'next/link'

function MainFooter() {
  return (
    <footer
      className={'mt-12 w-full px-5 py-8 flex flex-wrap justify-between bg-gray-100 gap-y-4'
    + ' lg:mt-20 lg:px-[8.875rem] lg:py-[3rem]'}>

      <article className={'w-full space-y-3' + ' lg:w-[15.125rem]'}>
        <div
          className={'relative w-[6.6875rem] h-[1.5rem]'
        + ' lg:w-[10rem] lg:h-[2.25rem]'}>
          <Image
            src={mainLogo}
            fill
            className='object-contain'
            alt='메인 로고'
          />
        </div>
        <Link
          href='/'
          className='hidden w-full pl-6 pr-4 py-3 items-center justify-between rounded-3xl bg-gray-50 lg:flex'
        >
          <p className='text-xs font-semibold text-gray-400'>궁금한 전공 질문을 검색해보세요</p>
          <Search className='w-5 h-5 text-gray-500' />
        </Link>
      </article>

      <article className={'w-full space-y-4' + ' lg:w-fit'}>
        <h1 className={'text-sm font-bold text-gray-700' + ' lg:text-lg'}>개인정보 및 서비스 약관</h1>
        <div className={'space-y-2 text-xs text-gray-500' + ' lg:text-sm lg:space-y-3'}>
          <div className='flex items-center space-x-1'>
            <a href='https://www.naver.com' className='font-bold text-blue-500'>개인정보처리방침</a>
            <ArrowUpRight className={'w-[1rem] h-[1rem] text-blue-300' + ' lg:w-[1.125rem] lg:h-[1.125rem]'} />
          </div>
          <a href='/' className='block'>이용약관</a>
          <Link href='/' className='block'>고객문의</Link>
        </div>
      </article>

      <article className={'pt-4 space-y-1.5 text-xs font-semibold'
      + ' lg:pt-[9.125rem] lg:text-right'}>
        <p className='text-gray-400'>대표 관리자<span className='px-2'>|</span><span className='text-gray-500'>고병욱</span></p>
        <p className='text-gray-400'>전화번호<span className='px-2'>|</span><span className='text-gray-500'>010-8945-1999</span></p>
        <p className='text-gray-400'>주소<span className='px-2'>|</span><span className='text-gray-500'>서울시 강남구 테헤란로 311(역삼동) 아남타워빌딩 7층</span></p>
      </article>
    </footer>
  )
}

export default MainFooter