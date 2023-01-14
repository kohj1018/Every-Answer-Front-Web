import { Search } from 'react-feather'
import Link from 'next/link'

function SearchBtn() {
  return (
    <Link
      href='/'
      className={'w-full px-6 py-3 flex items-center justify-between rounded-3xl bg-gray-50'
    + ' lg:px-6 lg:py-4'}
    >
      <p className='text-base font-semibold text-gray-400 lg:text-lg'>궁금한 전공 질문을 검색해보세요</p>
      <Search className='w-5 h-5 text-gray-500 lg:w-7 lg:h-7' />
    </Link>
  )
}

export default SearchBtn