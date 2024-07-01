import Logo from '@data/generator/svg.generator'
import Link from 'next/link'

export default function LogoComponent() {
  return (
    <Link href={'/'}>
      <Logo color='#ffffff' />
    </Link>
  )
}
