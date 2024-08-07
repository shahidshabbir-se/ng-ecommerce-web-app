import { authState } from '@interfaces/auth.interfaces'
import Slide from './slide'
import icons from '@icons'

interface SidebarProps {
  authState: authState
  handleAuthState: (authState: authState['currentState']) => void
  handleAuthAsideVisibility: (authAsideVisibility: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({
  authState,
  handleAuthState,
  handleAuthAsideVisibility
}) => {
  return (
    <aside
      className={`fixed right-0 top-0 z-[80] h-[calc(100vh-47px)] w-screen bg-[url('https://i.ibb.co/ZhFtRRN/mono-monochrome-stripe-drawstring-wide-leg-pants-768x1152.jpg')] bg-cover bg-center md:h-screen md:w-96`}
    >
      <div className='absolute z-10 size-full bg-white/10 px-3 pt-5 backdrop-blur-sm'>
        {authState.currentState === 'auth' && (
          <div className='absolute left-[calc(50%-60px)] top-[calc(50%-60px)] flex h-screen w-full -translate-x-[calc(50%-60px)] -translate-y-[calc(50%-60px)] flex-col items-center justify-center gap-4'>
            <CrossButton
              authState={authState}
              handleAuthStateChange={handleAuthState}
              handleAuthAsideVisibility={handleAuthAsideVisibility}
            />
            <button
              onClick={() => handleAuthState('register')}
              className='w-52 bg-black py-3 font-bold text-lg text-white'
            >
              Register
            </button>
            <button
              onClick={() => handleAuthState('login')}
              className='w-52 bg-white py-3 font-bold text-lg text-black'
            >
              Sign In
            </button>
          </div>
        )}
      </div>
      <Slide
        CrossButton={() => (
          <CrossButton
            authState={authState}
            handleAuthStateChange={handleAuthState}
            handleAuthAsideVisibility={handleAuthAsideVisibility}
          />
        )}
        currentState={authState.currentState}
      />
    </aside>
  )
}

interface CrossButtonProps {
  authState: authState
  handleAuthStateChange: (state: authState['currentState']) => void
  handleAuthAsideVisibility: (visible: boolean) => void
}

const CrossButton: React.FC<CrossButtonProps> = ({
  authState,
  handleAuthStateChange,
  handleAuthAsideVisibility
}) => {
  return (
    <button
      onClick={
        authState.currentState !== 'auth'
          ? () => handleAuthStateChange('auth')
          : () => handleAuthAsideVisibility(false)
      }
      className={`right-5 top-10 z-[90] flex items-center justify-center bg-white md:right-8 md:top-3
        ${authState.currentState === 'auth' ? 'absolute size-10' : 'min-h-10 min-w-10     border-2 border-black'}
        `}
    >
      <icons.cross className='size-8' />
    </button>
  )
}
export default Sidebar
