import { ChevronLeft, MoreHorizontal } from 'react-feather'
import { NextRouter } from 'next/router'
import React, { useState } from 'react'
import { Menu } from '@mui/material'

interface Props {
  router: NextRouter
  title: string
  children: React.ReactNode
}

function MobileBackHeaderWithBtn({ router, title, children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  return (
    <header className='fixed top-0 inset-x-0 px-5 py-4 flex items-center justify-between bg-white border-b border-gray-100 shadow-sm-custom z-50 lg:hidden'>
      <button
        onClick={() => router.back()}
        className='flex items-center space-x-1'
      >
        <ChevronLeft className='w-5 h-5 text-gray-300' />

        <h1 className='text-base font-semibold text-gray-700'>{title}</h1>
      </button>

      <button onClick={() => setIsMenuOpen(true)}>
        <MoreHorizontal className='w-5 h-5 text-gray-400' />
      </button>

      <Menu
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {children}
      </Menu>
    </header>
  )
}

export default MobileBackHeaderWithBtn