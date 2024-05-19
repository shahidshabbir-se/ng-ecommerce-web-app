import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@components/nav/navBar'
import LogoComponent from '@components/nav/logo'

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
  const serverLogo = <LogoComponent />

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/x-icon' />
      </head>
      <body>
        <Navbar serverLogo={serverLogo} />
        {children}
      </body>
    </html>
  )
}
