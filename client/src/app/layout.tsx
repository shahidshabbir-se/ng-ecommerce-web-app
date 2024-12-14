import type { Metadata } from 'next'
import './globals.css'
import Bar from '@components/bar/bar'
import ClientLoader from '@components/ClientLoader'

export const metadata: Metadata = {
  title: "Women's Clothes | Women's Fashion Online | Nasty Gal",
  description:
    'Enter the Nasty Galaxy. Shop the latest women’s clothing and fashion accessories online from Nasty Gal.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/x-icon' />
      </head>
      <body className='border-[#2222221a] bg-[#E6E3E6] dark:bg-[#222222] dark:text-white'>
        <ClientLoader />
        <Bar />
        <hr className='fixed left-[201px] hidden h-screen w-[1px] bg-[#d1ced1] lg:block dark:bg-[#ffffff1a]' />
        <main className='lg:mt-[30px] lg:pl-[202px]'>{children}</main>
      </body>
    </html>
  )
}
