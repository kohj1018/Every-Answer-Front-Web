import React, { FormEvent } from 'react'
import { Search } from 'react-feather'

interface Props {
  submitSearchTerm: (e: FormEvent<HTMLFormElement>) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

function SearchBar({ submitSearchTerm, searchTerm, setSearchTerm }: Props) {
  return (
    <form className='px-6 py-3 flex items-center justify-between rounded-3xl bg-gray-50 lg:py-4
                      focus-within:bg-gray-100 duration-500 focus-within:rounded-t-2xl focus-within:rounded-b-none'
          onSubmit={submitSearchTerm}
    >
      <input
        className='w-full text-base font-semibold text-gray-700 bg-transparent placeholder:text-gray-300 focus:outline-none lg:text-lg'
        name='searchTerm'
        placeholder='전공 질문을 검색해보세요.'
        value={searchTerm}
        type='text'
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button className='pl-5'>
        <Search className='w-5 h-5 text-gray-500 lg:w-6 lg:h-6' />
      </button>
    </form>
  )
}

export default SearchBar