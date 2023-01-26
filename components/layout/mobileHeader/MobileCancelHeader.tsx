import { X } from 'react-feather'
import { NextRouter } from 'next/router'

interface Props {
  router: NextRouter
  title: string
}

function MobileCancelHeader({ router, title }: Props) {
  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 flex items-center justify-center bg-white border-b border-gray-100 shadow-sm-custom lg:hidden'>
      <button
        onClick={() => router.back()}
        className='absolute left-5'
      >
        <X className='w-5 h-5 text-gray-300' />
      </button>
      <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
    </header>
  )
}

export default MobileCancelHeader