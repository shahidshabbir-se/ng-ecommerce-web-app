import HomeHC from '@components/carousel/horizontal/homeHC'
import Bar from '@components/specific/search/bar'
import { LowerBar } from '@components/nav/lowerBar'

export default function App() {
  return (
    <>
      <Bar />
      <div className='fixed -z-10'>
        <HomeHC />
      </div>
      <LowerBar />
    </>
  )
}
