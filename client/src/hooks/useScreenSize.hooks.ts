import { useState, useEffect } from 'react'

// Define an interface for the screenSize state
interface ScreenSize {
  width: number | undefined
  height: number | undefined
}

const useScreenSize = () => {
  // Use the ScreenSize interface for the state
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return screenSize
}

export default useScreenSize
