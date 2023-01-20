import { X } from 'react-feather'
import Link from 'next/link'

interface Props {
  title: string
}

function MobileCancelHeader({ title }: Props) {
  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 bg-white border-b border-gray-100 shadow-sm-custom lg:hidden'>
      <Link href='/' className='flex items-center space-x-1'>
        <X className='w-5 h-5 text-gray-300' />
        <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
      </Link>
    </header>
  )
}

export default MobileCancelHeader