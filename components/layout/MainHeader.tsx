import Link from 'next/link'
import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import { Search, User } from 'react-feather'

interface Props {
  isHiddenHeaderAndFooterOnMobile: boolean
}

function MainHeader({ isHiddenHeaderAndFooterOnMobile }: Props) {
  return (
    <header
      className={'fixed top-0 inset-x-0 px-5 py-3 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm-custom' + ' lg:mainWidthLimit'
    + (isHiddenHeaderAndFooterOnMobile ? ' hidden lg:flex' : '')}
    >
      <Link
        href='/'
        className='relative w-[6.6875rem] h-[1.5rem] lg:w-[8.3125rem] lg:h-[1.875rem]'
      >
        <Image
          src={mainLogo}
          fill
          className='object-contain'
          alt='메인 로고'
        />
      </Link>

      <section className='flex items-center space-x-4'>
        <Link href='/search'>
          <Search className='w-5 h-5 text-gray-400 lg:w-6 lg:h-6' />
        </Link>
        <Link href='/user' className='p-2 bg-gray-100 rounded-full'>
          <User className='w-4 h-4 text-gray-400 lg:w-5 lg:h-5' />
        </Link>
      </section>
    </header>
  )
}

export default MainHeader