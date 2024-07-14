import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import Register from './register'
import Login from './login'
import icons from '@icons'
import { authState } from '@interfaces/auth.interfaces'

const Slide = ({
  currentState
}: {
  currentState: authState['currentState']
}) => {
  const [shouldRenderComponent, setShouldRenderComponent] =
    useState(currentState)

  useEffect(() => {
    if (currentState === 'auth') {
      // Delay hiding the component after currentState changes to 'auth'
      const timeout = setTimeout(() => {
        setShouldRenderComponent('auth')
      }, 200) // Delay of 500ms when currentState changes to 'auth'
      return () => clearTimeout(timeout) // Cleanup on component unmount or state change
    } else {
      // Immediately render the component when currentState changes to 'register' or 'login'
      setShouldRenderComponent(currentState)
    }
  }, [currentState])

  return (
    <Transition in={currentState !== 'auth'} timeout={200} unmountOnExit>
      {(state) => (
        <div
          className={`absolute left-1/2 z-10 w-[340px] -translate-x-1/2 transform bg-white/70 pt-4 shadow-xl transition-transform duration-500 lg:bottom-4 ${state === 'entering' || state === 'entered' ? 'bottom-4 translate-y-0 md:bottom-1/2 md:translate-y-1/2 lg:translate-y-0 ' : 'bottom-0 translate-y-full'}`}
        >
          <button className='mx-4 flex w-[calc(100%-2rem)] items-center justify-center gap-2 bg-black py-2 font-bold text-xl text-white'>
            <icons.google className='size-6' />
            <span>
              Sign
              {currentState === 'register' ? ' up ' : ' in '}
              with Google
            </span>
          </button>
          {shouldRenderComponent === 'register' && <Register />}
          {shouldRenderComponent === 'login' && <Login />}
        </div>
      )}
    </Transition>
  )
}

export default Slide
