import { Search } from 'react-feather'
import Link from 'next/link'

function SearchBtn() {
  return (
    <Link
      href='/'
      className='w-full pl-4 pr-6 py-2.5 flex items-center justify-between rounded-3xl bg-gray-50'
    >
      <p className='text-xs font-semibold text-gray-400'>궁금한 전공 질문을 검색해보세요</p>
      <Search className='w-5 h-5 text-gray-500' />
    </Link>
  )
}

export default SearchBtn