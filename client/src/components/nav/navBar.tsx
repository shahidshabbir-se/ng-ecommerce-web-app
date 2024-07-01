'use client'
import Link from 'next/link'
import { usedIcons } from './usedIcons'
import { usePathname } from 'next/navigation'
import React from 'react'
import icons from '@data/generator/icon.generator'
import { navItems } from './navItems'

export default function Navbar({ serverLogo }: any) {
  const pathname = usePathname()
  return (
    <nav className='md:h-14rem fixed top-0 z-10 flex w-full flex-wrap items-center justify-between px-5 pt-2 font-extraBold text-white md:py-2'>
      <div className=''>{serverLogo}</div>
      <div className='order-3 flex w-full justify-center md:order-2 md:w-auto '>
        <ul className='flex'>
          {navItems.map((item, index) => (
            <Link
              href={pathname === '/' ? item.href : item.alternateHref}
              key={index}
              className='mx-2.5 mb-2 flex min-h-[2.75rem] cursor-pointer items-center justify-center border-b-2 border-white font-semibold md:mx-5 md:mb-0 md:text-xl'
            >
              {item.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className='order-2 flex justify-center md:order-3'>
        {usedIcons.map((usedIcon, index) => (
          <div key={index}>
            {usedIcon.icon === 'search' || usedIcon.icon === 'user' ? (
              pathname !== '/' ? (
                <button className='ml-2 flex h-11 items-center justify-end'>
                  {React.createElement(
                    icons[usedIcon.icon as keyof typeof icons],
                    {
                      className: 'size-6'
                    }
                  )}
                </button>
              ) : (
                <></>
              )
            ) : (
              <Link
                className='ml-2 flex h-11 items-center justify-end'
                href={usedIcon.href}
              >
                {React.createElement(
                  icons[usedIcon.icon as keyof typeof icons],
                  {
                    className: `size-6 ${usedIcon.icon === 'cart' ? 'stroke-white stroke-[0.5px]' : ''}`
                  }
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
