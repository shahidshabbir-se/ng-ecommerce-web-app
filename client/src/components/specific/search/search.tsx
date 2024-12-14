'use client'
import React, { useState } from 'react'
import icons from '@icons'
import SearchBox from './searchBox'

const Search = () => {
  const [showSearchBox, setShowSearchBox] = useState(false)

  const handleShowSearchBox = (value: boolean) => {
    setShowSearchBox(value)
  }

  return (
    <>
      <button
        onClick={() => setShowSearchBox(!showSearchBox)}
        className='ml-[10px] flex flex-grow items-center gap-2 lg:ml-0 lg:justify-between lg:border-b lg:p-4 dark:border-[#ffffff1a]'
      >
        <icons.search className='h-4 w-4 text-white lg:order-2 lg:text-black lg:dark:text-white' />
        <span className='h-full bg-transparent text-[13px] uppercase outline-none lg:order-1 lg:capitalize'>
          Search...
        </span>
      </button>
      {showSearchBox && (
        <SearchBox onClose={() => handleShowSearchBox(false)} />
      )}
    </>
  )
}

export default Search
