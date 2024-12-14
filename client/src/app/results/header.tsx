'use server'
import Link from 'next/link'
import { Fragment } from 'react'

const Header = () => {
  return (
    <header className='flex-col justify-between border-b border-[#d1ced1] p-5 px-5 md:flex md:flex-row lg:h-[90px] dark:border-[#ffffff1a]'>
      <div className='mb-1 flex items-center text-lg md:mb-0 lg:text-[22px]'>
        <Link
          href='/'
          className='flex items-center text-[#aaaaaa] duration-75 ease-in-out hover:text-black dark:text-[#646464] hover:dark:text-white'
        >
          <Fragment>Home</Fragment>
          <hr className='mx-2 mt-1 h-1 w-4 border-t-2 border-[#aaaaaa] dark:border-[#646464]' />
        </Link>
        <h2>Search Results</h2>
      </div>
      <span className='text-sm text-[#8e8d8e] md:text-base dark:text-[#7D7D7D]'>
        Find Your Perfect Style — Discover the Latest Trends
        <br className='hidden md:block' /> and Shop Your Dream Wardrobe!
      </span>
    </header>
  )
}

export default Header
