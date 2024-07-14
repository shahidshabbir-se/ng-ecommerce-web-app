'use client'
import { useOutsideClick } from '@hooks/clickOutside.hooks'
import { useAuthAsideVisibilityStore } from '@store/index'
import { Fragment, useState,useEffect } from 'react'
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
        <div className='translate-transform absolute top-0 z-[1999] h-screen w-screen bg-gray-500/65 duration-500' />
      )}
      <div
        className={`${
          authAsideVisibility ? 'translate-x-0' : 'translate-x-full'
        } fixed left-0 top-0 z-[2000] h-screen w-screen
            transform transition-transform duration-500`}
      >
        <div ref={ref}>
          <button
            onClick={
              authState.currentState !== 'auth'
                ? () => handleAuthStateChange('auth')
                : () => handleAuthAsideVisibility(false)
            }
          >
            <icons.cross
              className={`${
                authState.currentState === 'auth'
                  ? 'bottom-6'
                  : authState.currentState === 'register'
                    ? 'bottom-[550px]'
                    : 'bottom-[350px]'
              } md:translate-r-[23.5rem] absolute left-1/2 z-[90] size-10 -translate-x-1/2 bg-white md:left-[calc(100%-25.5rem)] md:top-2 md:size-8`}
            />
            {/* TODO: 
            1.icon position on register and login component rendering
          */}
          </button>
          <Sidebar
            authState={authState}
            handleAuthState={handleAuthStateChange}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default Index
