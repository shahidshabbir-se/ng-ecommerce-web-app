'use client'
import { useSearchVisibilityStore } from '@store/index'
import { useAuthAsideVisibilityStore } from '@store/index'
import { useGlobalUserStore } from '@store/globalUser/store'
import { useEffect, useState } from 'react'
import icons from '@icons'
import Cookies from 'js-cookie'
import axios from 'axios'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { GlobalUserState } from '@store/globalUser/types'

export const SearchButton = ({
  buttonStyle,
  iconStyle
}: {
  buttonStyle?: string
  iconStyle?: string
}): JSX.Element => {
  const handleSearchBarVisibility = useSearchVisibilityStore(
    (state) => state.setSearchBarVisibility
  )

  return (
    <button
      onClick={() => handleSearchBarVisibility(true)}
      className={buttonStyle}
    >
      <icons.search className={iconStyle} />
    </button>
  )
}

export const AccountButton = ({
  buttonStyle,
  iconStyle
}: {
  buttonStyle?: string
  iconStyle?: string
}): JSX.Element => {
  const handleAuthAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.setAuthAsideVisibility
  )
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [login, setLogin] = useState<boolean>(false)
  const userId = useGlobalUserStore((state) => state.userId) // Subscribe to store updates

  useEffect(() => {
    const token = Cookies.get('accessToken')
    console.log('token:', token)
    const fetchUser = async () => {
      console.log('login:', login)
      if (token) {
        try {
          const response = await axios.get(
            'http://localhost:8080/api/user/verifyUserByToken',
            {
              headers: { accesstoken: token }
            }
          )
          const userData: GlobalUserState = {
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            userId: response.data.userId,
            cart: response.data.cart,
            addresses: response.data.addresses,
            profileImage: response.data.profileImage,
            wishlist: response.data.wishlist,
            orders: response.data.orders,
            password: response.data.password ? response.data.password : null,
            googleId: response.data.googleId ? response.data.googleId : null
          }
          useGlobalUserStore.getState().setUser(userData)
          setLogin(true)
          console.log('login:', login)
          console.log('userId:', userId)
        } catch (error) {
          console.error('Error fetching user data:', error)
          setLogin(false)
        }
      } else {
        setLogin(false)
      }
    }
    fetchUser()
  }, [userId])
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <div>
      <Button
        aria-describedby={id}
        variant='text'
        onClick={
          login
            ? handleClick
            : () => {
                handleAuthAsideVisibility(true)
              }
        }
        className={buttonStyle}
        disableTouchRipple
        sx={{
          padding: 0,
          minWidth: 0,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        <icons.user className={iconStyle} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </div>
  )
}
