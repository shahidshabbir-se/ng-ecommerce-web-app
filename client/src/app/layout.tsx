import type { Metadata } from 'next'
import './globals.css'
import Bar from '@components/bar/bar'

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
      <body className='border-[#2222221a] bg-[url("https://uk.p448.com/cdn/shop/files/CTA-SINGLE_4200x2940_DSK-P448-US-UK.jpg?v=1731687329&width=4200")] bg-cover dark:bg-[#313131] dark:text-white'>
        <Bar />
        {children}
      </body>
    </html>
  )
}
