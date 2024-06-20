import Link from 'next/link'
import icons from '@data/generator/icon.generator'
// import type { SwiperRef } from 'swiper/react'
import HomeHC from '@components/carousel/horizontal/homeHC'
import Bar from '@components/specific/search/bar'

export default function App() {
  return (
    <>
      <Bar/>
      <div className='fixed -z-10'>
        <div>
          {/* <HomeHC/> */}
        </div>
        <div>
          <div
            className='fixed bottom-[5%] left-1/2 z-50 flex w-1/3 -translate-x-1/2 items-center justify-center gap-10 text-[30px] lg:gap-40'>
            <Link
              href={'/'}
              className='white size-[38px] rounded-full bg-white p-1 opacity-85'
            >
              <icons.home/>
            </Link>
            <Link href={'/'} className='white rounded-full bg-white p-2'>
              <icons.search/>
            </Link>
            <Link
              href={'/'}
              className='white size-[38px] rounded-full bg-white p-1 opacity-85'
            >
              <icons.user/>
            </Link>
          </div>
        </div>
      </div>
    </>
    // <div className='flex h-screen w-screen items-center justify-center'>
    //   <div className='absolute top-0 h-screen w-screen bg-red-500 text-center'>
    //     <h1 className=''>Slide1</h1>
    //   </div>
    //   <div className='absolute top-3'>
    //     <h2>Slide 2</h2>
    //   </div>
    // </div>
  )
}
