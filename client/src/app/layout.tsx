import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@components/nav/navBar'
import SearchBar from '@components/specific/search/searchBar'
import Index from '@components/auth'

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
      <body>
        <NavBar />
        <SearchBar />
        <Index />
        <div className='relative mt-[60px]'>{children}</div>
      </body>
    </html>
  )
}
