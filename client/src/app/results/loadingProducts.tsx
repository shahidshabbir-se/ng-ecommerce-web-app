'use server'
import LoadingBar from '@components/specific/result/loadingBar'
import LoadingCard from '@components/specific/result/loadingCard'

const LoadingProducts = async () => {
  return (
    <div className='relative w-full max-w-[900px]'>
      <div className='mb-4 mr-2 flex items-end justify-between md:items-center md:justify-end'>
        <div className='md:hidden'>
          <LoadingBar width={100} height={36} py={8} />
        </div>
        <LoadingBar width={148.5} height={36} py={8} />
      </div>
      <div className='width-full grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-2 lg:grid-cols-4'>
        {Array.from({ length: 8 }, (_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </div>
  )
}

export default LoadingProducts
