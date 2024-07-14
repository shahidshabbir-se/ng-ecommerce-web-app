import React from 'react'
import { AccountButton, SearchButton } from './navButtons'
import Link from 'next/link'
import icons from '@icons'
import Image from 'next/image'

interface LinksProps {
  links: Link[]
}

interface Link {
  href?: string
  icon?: React.ReactNode
  label?: string
  iconStyle?: string
}

const Links: React.FC<LinksProps> = ({ links }) => {
  const iconsStyle = 'size-6 group-hover:text-gray-600'
  const buttonStyle = 'size-[34px] text-black items-center flex justify-center'

  return (
    <div className='flex group-hover:space-x-5'>
      {links.map((link, index) => (
        <div
          key={index}
          className={`group flex h-[60px] items-center
            ${index !== 0 && index !== 2 && ' border-x border-transparent hover:border-gray-300 '}
          `}
        >
          {link.href ? (
            <Link
              className={`${buttonStyle} group-hover:text-gray-600`}
              href={link.href}
            >
              {link.icon &&
                React.isValidElement(link.icon) &&
                React.cloneElement(link.icon as React.ReactElement<any>, {
                  className: link.iconStyle
                })}
            </Link>
          ) : (
            <div className='group'>
              {link.label === 'search' ? (
                <SearchButton
                  iconStyle={iconsStyle}
                  buttonStyle={buttonStyle}
                />
              ) : link.label === 'account' ? (
                <AccountButton
                  iconStyle={iconsStyle}
                  buttonStyle={buttonStyle}
                />
              ) : (
                ''
              )}
            </div>
          )}
          {index !== 0 && index !== 2 && (
            <Image
              width='100'
              height='100'
              layout='fixed'
              src='/svg/border.svg'
              className='invisible absolute bottom-0 h-min w-min group-hover:visible'
              alt=''
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Links
