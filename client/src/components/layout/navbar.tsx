import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

export default function navbar(props: any) {
  return (
    <Navbar shouldHideOnScroll maxWidth='full' height={48}>
      <NavbarContent>
        <Link href=''>
          <Image alt='' width={24} height={24} src='/svg/hamburger.svg' />
        </Link>
        <Link href=''>
          <Image alt='' width={24} height={24} src='/svg/heart.svg' />
        </Link>
      </NavbarContent>
      <NavbarBrand>
        <Link href='/'>
          <Image alt='' width={100} height={100} src='/logo.svg' />
        </Link>
      </NavbarBrand>
      <NavbarContent>
        <Link href=''>
          <Image alt='' width={24} height={24} src='/svg/search.svg' />
        </Link>
        <Link href=''>
          <Image alt='' width={24} height={24} src='/svg/cart.svg' />
        </Link>
      </NavbarContent>
    </Navbar>
  )
}
