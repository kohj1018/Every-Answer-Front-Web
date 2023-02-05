import { ChevronLeft } from 'react-feather'
import Link from 'next/link'
import { NextRouter } from 'next/router'

interface Props {
  title: string
  router?: NextRouter | null
  link?: string | null
}

/** 뒤로가기 눌렀을 때 히스토리 바로 뒤로 가려면 router 값 넣고, 원하는 링크로 보내주려면 link 값 넣기 */
function MobileCenterTitleHeader({ title, router = null, link = null }: Props) {
  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 flex items-center justify-center bg-white z-50 lg:hidden'>
      {link ? (
        <Link href={link} className='absolute left-5'>
          <ChevronLeft className='w-5 h-5 text-gray-300' />
        </Link>
      ) : (
        <button onClick={() => router?.back()} className='absolute left-5'>
          <ChevronLeft className='w-5 h-5 text-gray-300' />
        </button>
      )}
      <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
    </header>
  )
}

export default MobileCenterTitleHeader