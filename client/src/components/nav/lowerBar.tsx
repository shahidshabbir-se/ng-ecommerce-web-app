'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import icons from '@data/generator/icon.generator'
import { useSearchVisibilityStore } from '@store/index'
import { useAuthAsideVisibilityStore } from '@store/index'

export const LowerBar = () => {
  const handleSearchBarVisibility = useSearchVisibilityStore(
    (state) => state.setSearchBarVisibility
  )
  const handleAuthAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.setAuthAsideVisibility
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
          <button
            onClick={() => handleAuthAsideVisibility(true)}
            className='white size-[38px] rounded-full bg-white p-1 opacity-85'
          >
            <icons.user />
          </button>
        </div>
      </div>
    </div>
  )
}
