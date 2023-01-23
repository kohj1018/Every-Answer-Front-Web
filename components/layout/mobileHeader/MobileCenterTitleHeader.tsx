import { ChevronLeft } from 'react-feather'
import Link from 'next/link'

interface Props {
  title: string
}

function MobileCenterTitleHeader({ title }: Props) {
  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 flex items-center justify-center bg-white border-b border-gray-100 lg:hidden'>
      <Link href='/' className='absolute left-5'>
        <ChevronLeft className='w-5 h-5 text-gray-300' />
      </Link>
      <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
    </header>
  )
}

export default MobileCenterTitleHeader