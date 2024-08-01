'use client'
import { useOutsideClick } from '@hooks/clickOutside.hooks'
import { useAuthAsideVisibilityStore } from '@store/index'
import { Fragment, useState, useEffect } from 'react'
import Sidebar from './sidebar'
import { authState } from '@interfaces/auth.interfaces'
import icons from '@icons'

const Index = () => {
  const [authState, setAuthState] = useState<authState>({
    currentState: 'auth'
  })

  const handleAuthStateChange = (newState: 'auth' | 'register' | 'login') => {
    setTimeout(() => {
      setAuthState({ currentState: newState })
    }, 220)
  }

  const handleAuthAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.setAuthAsideVisibility
  )

  const authAsideVisibility = useAuthAsideVisibilityStore(
    (state) => state.authAsideVisibility
  )

  const ref = useOutsideClick(() => {
    handleAuthAsideVisibility(false)
    setAuthState({ currentState: 'auth' })
  })

  return (
    <Fragment>
      {authAsideVisibility && (
        <div className='translate-transform fixed inset-0 z-[1999] h-full w-screen md:bg-blurbg duration-500 md:block hidden' />
      )}
      <div
        className={`${
          authAsideVisibility ? 'translate-x-0' : 'translate-x-full'
        } fixed left-0 z-[2000] h-[calc(100vh-46px)] w-screen transform
            transition-transform duration-500 -mt-0.5 md:mt-0 md:top-0`}
      >
        <div ref={ref}>
          <Sidebar
            authState={authState}
            handleAuthState={handleAuthStateChange}
            handleAuthAsideVisibility={handleAuthAsideVisibility}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Index
