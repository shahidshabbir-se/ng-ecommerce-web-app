import Link from 'next/link'
import Image from 'next/image'
const Logo = () => {
  return (
    <Link href='/' className='min-w-[132px] max-w-[132px]'>
      <Image src='/logo.svg' alt='Nasty Gal Logo' width={132} height={40} />
    </Link>
  )
}

export default Logo
