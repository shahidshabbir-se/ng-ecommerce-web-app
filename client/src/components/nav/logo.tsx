import Link from 'next/link'
import Image from 'next/image'
const Logo = () => {
  return (
    <Link
      href='/'
      className='min-w-[97px] lg:translate-x-0 absolute lg:static left-1/2 -translate-x-1/2 md:min-w-[132px] lg:max-w-[132px] max-w-[97px]'
    >
      <Image src='/logo.svg' alt='Nasty Gal Logo' width={132} height={40} />
    </Link>
  )
}

export default Logo
