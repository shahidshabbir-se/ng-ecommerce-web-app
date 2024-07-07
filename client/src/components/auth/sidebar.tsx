import Logo from '@data/generator/svg.generator'
import { authState } from '@interfaces/auth.interfaces'
import Slide from './slide'
import Image from 'next/image'
import Link from 'next/link'

const Sidebar = ({
  authState,
  handleAuthState
}: {
  authState: authState
  handleAuthState: (authState: authState['currentState']) => void
}) => {
  return (
    <aside
      className={`fixed right-0 top-0 z-[80] h-screen w-screen bg-[url('https://i.ibb.co/ZhFtRRN/mono-monochrome-stripe-drawstring-wide-leg-pants-768x1152.jpg')] bg-cover bg-center sm:top-2 sm:h-[calc(100vh-1rem)] md:w-96 md:rounded-s-3xl`}
    >
      <div className='absolute z-10 size-full rounded-s-3xl bg-white/10 px-3 pt-5 backdrop-blur-sm'>
        <div className='flex items-center justify-center'>
          <Image width={32} height={32} src='/favicon.svg' alt='favicon' />
          <Logo color='#000000' />
        </div>
        {authState.currentState === 'auth' && (
          <div className='absolute left-[calc(50%-60px)] top-[calc(50%-60px)] flex h-screen w-full -translate-x-[calc(50%-60px)] -translate-y-[calc(50%-60px)] flex-col items-center justify-center gap-4'>
            <button
              onClick={() => handleAuthState('register')}
              className='w-52 rounded-s-xl rounded-t-xl bg-black py-3 font-bold text-lg text-white'
            >
              Register
            </button>
            <button
              onClick={() => handleAuthState('login')}
              className='w-52 rounded-e-xl rounded-t-xl bg-white py-3 font-bold text-lg text-black'
            >
              Sign In
            </button>
          </div>
        )}
      </div>
      <Slide currentState={authState.currentState} />
    </aside>
  )
}

export default Sidebar
