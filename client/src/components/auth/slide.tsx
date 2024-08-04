import React, { useState, useEffect } from 'react'
import { Transition } from 'react-transition-group'
import Register from './register'
import Login from './login'
import icons from '@icons'
import { authState } from '@interfaces/auth.interfaces'

interface SlideProps {
  currentState: authState['currentState']
  CrossButton: React.FC
}

const Slide: React.FC<SlideProps> = ({ currentState, CrossButton }) => {
  const [shouldRenderComponent, setShouldRenderComponent] =
    useState(currentState)

  useEffect(() => {
    console.log('currentState changed:', currentState) // Debugging line
    if (currentState === 'auth') {
      // Delay hiding the component after currentState changes to 'auth'
      const timeout = setTimeout(() => {
        setShouldRenderComponent('auth')
      }, 500) // Delay of 500ms when currentState changes to 'auth'
      return () => clearTimeout(timeout) // Cleanup on component unmount or state change
    } else {
      // Immediately render the component when currentState changes to 'register' or 'login'
      setShouldRenderComponent(currentState)
    }
  }, [currentState])

  useEffect(() => {
    console.log('shouldRenderComponent updated:', shouldRenderComponent) // Debugging line
  }, [shouldRenderComponent])

  return (
    <Transition in={currentState !== 'auth'} timeout={500} unmountOnExit>
      {(state) => (
        <div
          className={`absolute left-1/2 z-10 w-[calc(100vw-20px)] -translate-x-1/2 transform bg-white/70 pt-4 shadow-xl transition-transform duration-500 md:w-[340px] ${state === 'entering' || state === 'entered' ? 'bottom-1/2 translate-y-1/2' : 'bottom-0 translate-y-full'}`}
        >
          <div className='relative flex gap-4 px-4'>
            <a
              href={process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}
              className='flex w-full items-center justify-center gap-2 bg-black py-2 font-bold text-xl text-white md:w-[calc(100%-2rem)]'
            >
              <icons.google className='size-6' />
              <span>
                Sign
                {currentState === 'register' ? ' up ' : ' in '}
                with Google
              </span>
            </a>
            <CrossButton />
          </div>
          {shouldRenderComponent === 'register' && <Register />}
          {shouldRenderComponent === 'login' && <Login />}
          <p className='mb-5 flex w-full justify-center text-slate-900'>
            {shouldRenderComponent === 'register'
              ? 'Already have an account?'
              : 'New to Nastygal?'}
            <button
              onClick={() =>
                setShouldRenderComponent(
                  shouldRenderComponent === 'register' ? 'login' : 'register'
                )
              }
              className='mx-2 font-chronicle text-lg text-black underline'
            >
              {shouldRenderComponent === 'register' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      )}
    </Transition>
  )
}

export default Slide
