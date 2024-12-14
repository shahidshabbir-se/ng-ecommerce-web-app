'use client'
import React from 'react'
import Link from 'next/link'
import icons from '@icons'
import { useSearchVisibilityStore } from '@store/index'

export const LowerBar = () => {
  const handleSearchBarVisibility = useSearchVisibilityStore(
    (state) => state.setSearchBarVisibility
  )
  return (
    <div>
      <div>
        <div className='fixed bottom-[5%] left-1/2 z-50 flex w-1/3 -translate-x-1/2 items-center justify-center gap-10 text-[30px] lg:gap-40'>
          <Link
            href={'/'}
            className='white size-[38px] rounded-full bg-white p-1 opacity-85'
          >
            <icons.home />
          </Link>
          <button
            onClick={() => handleSearchBarVisibility(true)}
            className='white rounded-full bg-white p-2'
          >
            <icons.search />
          </button>
          <Link
            href={'/'}
            className='white size-[38px] rounded-full bg-white p-1 opacity-85'
          >
            <icons.user />
          </Link>
        </div>
      </div>
    </div>
  )
}
