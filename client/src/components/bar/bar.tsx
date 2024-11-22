import Image from 'next/image'
import icons from '@icons'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import ThemeButton from './themeButton'
import Search from '@components/specific/search/search'
const Bar = () => {
  const navButtons = ['Sale', 'Women', 'Men', 'Shoes']
  const marqueeText = [
    'Free 14 day returns',
    ' - ',
    'Shop FW24 collection',
    ' - '
  ]
  return (
    <div className='flex flex-col'>
      <div className='left-0 top-[30px] flex h-12 w-screen items-center gap-2 overflow-hidden overflow-x-hidden border-r border-[#ffffff1a] bg-[#0e3cf6] lg:absolute lg:order-2 lg:h-[calc(100vh-30px)] lg:w-[201px] lg:flex-col lg:items-start lg:bg-transparent lg:p-5'>
        <div className='flex w-[100px] items-center justify-center rounded-[5px] border-r border-[#ffffff1a] lg:w-full lg:flex-col lg:bg-[#0e3cf6]'>
          <Link href='/' className='relative m-4 h-8 w-[80%] lg:h-14'>
            <Image
              src='/logo.svg'
              alt='Logo'
              layout='fill'
              className='object-contain'
            />
          </Link>
          <nav className='hidden w-full flex-col items-start gap-[5px] p-4 text-white lg:flex lg:border-t lg:border-[#ffffff1a]'>
            {navButtons.map((button, index) => (
              <button
                key={index}
                className='group flex items-center gap-2 text-white'
              >
                <span className='invisible size-1.5 animate-pulse rounded-full bg-white transition-all duration-300 ease-in-out group-hover:visible' />
                <span className='-translate-x-3 transform transition-all duration-500 ease-in-out group-hover:translate-x-1 group-hover:opacity-100'>
                  {button}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className='flex w-full text-white lg:flex-col lg:rounded-[5px] lg:bg-white lg:text-[#969696] lg:dark:bg-dark-bg'>
          <Search />
          <div className='flex items-center pr-4 text-white lg:flex-col lg:justify-center lg:gap-[5px] lg:p-4 lg:text-black lg:dark:text-white'>
            <Link
              href='/account'
              className='group flex items-center justify-between lg:w-full'
            >
              <span className='invisible hidden size-1.5 animate-pulse rounded-full bg-black transition-all duration-300 ease-in-out group-hover:visible lg:block dark:bg-white' />
              <span className='hidden lg:block lg:-translate-x-8 lg:transform lg:transition-all lg:duration-500 lg:ease-in-out lg:group-hover:-translate-x-4'>
                Account
              </span>
              <icons.user className='h-4 w-4 stroke-[8px]' />
            </Link>
            <Link
              href='/cart'
              className='group flex items-center justify-between lg:w-full'
            >
              <span className='invisible hidden size-1.5 animate-pulse rounded-full bg-black transition-all duration-300 ease-in-out group-hover:visible lg:block dark:bg-white' />
              <span className='hidden lg:block lg:-translate-x-11 lg:transform lg:transition-all lg:duration-500 lg:ease-in-out lg:group-hover:-translate-x-7'>
                Cart
              </span>
              <icons.cart className='h-4 w-4 stroke-[8px]' />
            </Link>
            <icons.menu className='h-4 w-8 lg:hidden' />
          </div>
        </div>
      </div>
      <div className='flex h-[30px] items-center bg-[#222222] text-sm text-white lg:order-1'>
        <span className='order-2 flex h-full w-[230px] items-center justify-between border-l border-[#383838] px-5 text-left lg:order-1 lg:border-r'>
          <p>LIGHT MODE</p>
          <ThemeButton />
        </span>
        <Marquee className='order-1' pauseOnHover>
          {Array.from({ length: 2 }).flatMap((_, i) =>
            marqueeText.map((text, index) => (
              <span key={`${i}-${index}`} className='mx-12 whitespace-nowrap'>
                {text}
              </span>
            ))
          )}
        </Marquee>
      </div>
    </div>
  )
}

export default Bar
