'use client'
import React, { useState } from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import Sidebar from './sideBar'
import MegaMenu from './megaMenu'

const MenuSidebarContainer: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleMegaMenuEnter = () => {
    setIsMegaMenuOpen(true)
  }

  const handleMegaMenuLeave = () => {
    setIsMegaMenuOpen(false)
  }

  return (
    <div className='flex w-full justify-start'>
      {isMobile ? (
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
          isMegaMenuOpen={isMegaMenuOpen}
          onMegaMenuEnter={handleMegaMenuEnter}
          onMegaMenuLeave={handleMegaMenuLeave}
        />
      ) : (
        <MegaMenu />
      )}
    </div>
  )
}

export default MenuSidebarContainer
