'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Slide from '@mui/material/Slide'

interface HideOnScrollProps {
  children: React.ReactElement
}

function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props
  const trigger = useScrollTrigger({
    threshold: 100
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

interface NavBarProps {
  children?: React.ReactNode // Allow any React nodes as children
}

const NavContainer: React.FC<NavBarProps> = ({ children }) => {
  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar color='inherit' elevation={0}>
          {children}
        </AppBar>
      </HideOnScroll>
    </React.Fragment>
  )
}

export default NavContainer
