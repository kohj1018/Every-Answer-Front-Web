import Link from 'next/link'
import { ChevronLeft, MoreHorizontal } from 'react-feather'

interface Props {
  title: string
}

function MobileBackHeader({ title }: Props) {
  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm-custom lg:hidden'>
      <Link
        href='/'
        className='flex items-center space-x-1'
      >
        <ChevronLeft className='w-5 h-5 text-gray-300' />
        <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
      </Link>

      <button>
        <MoreHorizontal className='w-5 h-5 text-gray-400' />
      </button>
    </header>
  )
}

export default MobileBackHeader