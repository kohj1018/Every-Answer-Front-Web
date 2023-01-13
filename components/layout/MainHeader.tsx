import Link from 'next/link'
import Image from 'next/image'
import mainLogo from '../../public/mainLogo.svg'
import { User } from 'react-feather'

function MainHeader() {
  return (
    <header
      className={'w-full px-5 py-2.5 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm-custom'
    + ' lg:px-[21.625rem]'}
    >
      <Link href='/' className='relative w-[5.8125rem] h-[1.25rem]'>
        <Image
          src={mainLogo}
          fill
          className='object-contain'
          alt='메인 로고'
        />
      </Link>

      <section className='flex items-center space-x-2'>
        <button className='px-3 py-1.5 rounded-3xl bg-blue-500 text-xs font-semibold text-gray-50'>
          질문하기
        </button>
        <button className='p-1.5 bg-gray-100 rounded-full'>
          <User className='w-4 h-4 text-gray-400' />
        </button>
      </section>
    </header>
  )
}

export default MainHeader