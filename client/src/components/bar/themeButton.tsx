'use client'
import { useState, useEffect } from 'react'
import useTheme from '@hooks/useTheme.hooks'
import { Switch } from '@mui/material'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import Slide from '@mui/material/Slide'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  marginRight: -6,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}))

const ThemeButton = () => {
  const { activeTheme, handleThemeChange } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showSlideDiv, setShowSlideDiv] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      if (showSlideDiv) {
        setTimeout(() => {
          setShowSlideDiv(false)
        }, 1000)
      }
    }
  }, [showSlideDiv, mounted])

  if (!mounted) {
    return null
  }

  const handleSwitchChange = (e) => {
    const newTheme = e.target.checked ? 'dark' : 'light'
    handleThemeChange(newTheme)
    setShowSlideDiv(true)
  }

  return (
    <>
      <AntSwitch
        className='scale-50'
        checked={activeTheme === 'dark'}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'theme switch' }}
      />
      <Slide direction='down' in={showSlideDiv} mountOnEnter unmountOnExit>
        <div className='fixed left-0 top-0 z-10 flex h-screen w-screen -translate-x-1/2 transform items-center justify-center rounded-md bg-[#0e3cf6]'>
          <div className='relative m-4 h-8 w-full lg:h-14'>
            <Image
              src='/logo.svg'
              alt='Logo'
              layout='fill'
              className='object-contain'
            />
          </div>
        </div>
      </Slide>
    </>
  )
}

export default ThemeButton
