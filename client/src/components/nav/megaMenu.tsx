import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Link from 'next/link'
import Collapse from '@mui/material/Collapse'
import {
  MenuData,
  MenuProps,
  MenuItems,
  MenuItemsList,
  Item,
  Offers
} from '@data/menuContent'
import Image from 'next/image'

export default function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const handleMouseEnter = (menuLabel: string) => {
    setActiveMenu(menuLabel)
  }

  const handleMouseLeave = () => {
    setActiveMenu(null)
  }

  return (
    <Box className='mx-4'>
      <Box
        sx={{
          display: 'flex',
          height: 60,
          alignItems: 'center',
          justifyContent: 'space-around'
        }}
        onMouseLeave={handleMouseLeave}
        className='font-bold text-lg'
      >
        {MenuData.map((menu: MenuProps) => (
          <div key={menu.anchorLabel} className='group'>
            {activeMenu && (
              <div className='absolute left-0 top-[60px] -z-10 h-screen w-screen bg-[#858585]/50 ' />
            )}
            {menu.anchorLink ? (
              <Link
                onMouseEnter={() => handleMouseLeave()}
                className={`group relative flex flex-col items-center border-x border-transparent px-2 py-5 hover:border-gray-300 ${menu.anchorLabel === 'Sale' ? 'text-red-500' : 'text-black hover:text-[#858585]'}`}
                href={menu.anchorLink}
              >
                <h1>{menu.anchorLabel}</h1>
                <Image
                  width='100'
                  height='100'
                  layout='fixed'
                  src='/svg/border.svg'
                  className='invisible absolute bottom-0 h-min w-min group-hover:visible'
                  alt=''
                />
              </Link>
            ) : (
              <div
                onMouseEnter={() => handleMouseEnter(menu.anchorLabel)}
                className={`group relative flex flex-col items-center border border-transparent px-2 py-5 hover:border-gray-300 ${menu.anchorLabel === 'Sale' ? 'text-red-500' : 'text-black hover:text-[#858585]'}`}
              >
                <button>{menu.anchorLabel}</button>
                <Image
                  width='100'
                  height='100'
                  layout='fixed'
                  src='/svg/border.svg'
                  className='invisible absolute bottom-0 h-min w-min group-hover:visible'
                  alt=''
                />
              </div>
            )}
          </div>
        ))}
      </Box>
      <Box className='absolute left-5'>
        {MenuData.map((menu: MenuProps) => (
          <Collapse
            key={menu.anchorLabel}
            in={activeMenu === menu.anchorLabel && !menu.anchorLink}
            timeout={{ enter: 500, exit: 0 }}
            unmountOnExit
            onMouseEnter={() => setActiveMenu(menu.anchorLabel)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <Box
              sx={{
                overflowY: 'auto',
                maxHeight: '70vh'
              }}
            >
              {activeMenu === menu.anchorLabel && !menu.anchorLink && (
                <Paper
                  className='min-h-[70vh] w-[calc(100vw-3.5rem)] rounded-none border-t p-[20px] pr-0'
                  elevation={4}
                >
                  <Box sx={{ p: 2 }} className='flex flex-wrap'>
                    {menu.menuItems.map((menuItem: MenuItems) => (
                      <div
                        key={menuItem.menuLabel}
                        className='min-w-[20%] pr-[60px]'
                      >
                        <h3 className='my-3 px-1.5 font-chronicle text-lg uppercase leading-[18px]'>
                          {menuItem.menuLabel}
                        </h3>
                        <hr className='mb-3 ml-1.5 h-0 w-[30px] border border-[#CFCFCF]' />
                        {menuItem.menuItemsList.map(
                          (menuItemList: MenuItemsList) => (
                            <div
                              className='grid gap-1'
                              key={menuItemList.menuItems[0]?.label}
                            >
                              {menuItemList.menuItems.map((item: Item) => (
                                <Link
                                  className='p-1.5 text-lg hover:text-[#858585]'
                                  key={item.label}
                                  href={item.link}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                    {menu.menuOffers && (
                      <div className='w-1/4 pr-[60px]'>
                        <h3 className='my-3 px-1.5 font-chronicle text-lg uppercase leading-[18px]'>
                          Special Offers:
                        </h3>
                        <hr className='mb-3 ml-1.5 h-0 w-[30px] border border-[#CFCFCF]' />
                        {menu.menuOffers.map((offer: Offers, index: number) => (
                          <div className='grid gap-1' key={index}>
                            {offer.itemList.map((offerItem: Item) => (
                              <Link
                                className='p-1.5 font-bold text-lg text-pink-500'
                                key={offerItem.label}
                                href={offerItem.link}
                              >
                                {offerItem.label}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                    {menu.menuImage && (
                      <div className='relative mt-4'>
                        <Link href={menu.menuImage.imageLink}>
                          <Image
                            width='244'
                            height='366'
                            quality='80'
                            alt=''
                            src={menu.menuImage.imageUrl}
                          />
                          <h1
                            style={{
                              backgroundImage:
                                'linear-gradient(to top, hsl(0, 0%, 0%) 15%, rgba(0, 0, 0, 0.11) 84%, rgba(0, 0, 0, 0))'
                            }}
                            className='absolute bottom-0 flex min-h-[105px] w-full items-center justify-center font-bold text-lg text-white'
                          >
                            {menu.menuImage.label}
                          </h1>
                        </Link>
                      </div>
                    )}
                  </Box>
                </Paper>
              )}
            </Box>
          </Collapse>
        ))}
      </Box>
    </Box>
  )
}
