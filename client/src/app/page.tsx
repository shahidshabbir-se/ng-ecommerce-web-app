import HomeHC from '@components/carousel/horizontal/homeHC'
import Bar from '@components/specific/search/bar'
import { LowerBar } from '@components/nav/lowerBar'
import Index from '@components/auth/index'

export default function App() {
  return (
    <>
      <Bar />
      <Index />
      <div className='fixed -z-10'>
        <HomeHC />
      </div>
      <LowerBar />
    </>
  )
}
