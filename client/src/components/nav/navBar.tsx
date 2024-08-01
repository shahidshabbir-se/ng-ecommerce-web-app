import NavContainer from './navContainer'
import Links from './navlinks'
import icons from '@icons'
import MenuSidebarContainer from './menuSidebarCont'
import Logo from './logo'

const NavBar = () => {
  const iconsStyle = 'size-6'
  return (
    <NavContainer>
      <div className='flex min-h-[60px] w-full items-center justify-between px-0 md:px-5'>
        <Logo />
        <MenuSidebarContainer />
        <Links
          links={[
            {
              label: 'search'
            },
            {
              label: 'account'
            },
            {
              href: '/cart',
              icon: <icons.cart />,
              iconStyle: iconsStyle
            },
            {
              href: '/wishlist',
              icon: <icons.heart />,
              iconStyle: iconsStyle
            }
          ]}
        />
      </div>
    </NavContainer>
  )
}

export default NavBar
