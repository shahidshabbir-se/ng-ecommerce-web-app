import Link from 'next/link'
import Image from 'next/image'
const Logo = () => {
  return (
    <Link
      href='/'
      className='absolute left-1/2 min-w-[97px] max-w-[97px] -translate-x-1/2 md:min-w-[132px] lg:static lg:max-w-[132px] lg:translate-x-0'
    >
      <Image src='/logo.svg' alt='Nasty Gal Logo' width={132} height={40} />
    </Link>
  )
}

export default Logo
