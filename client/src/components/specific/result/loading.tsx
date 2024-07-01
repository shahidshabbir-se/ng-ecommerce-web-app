import LoadingCard from './loadingCard'
import LoadingBar from './loadingBar'

const barStyles = [
  { width: 100, height: 40, py: 8 },
  { width: 150, height: 40, py: 8 },
  { width: 75, height: 40, py: 8 },
  { width: 175, height: 40, py: 8 },
  { width: 65, height: 40, py: 8 },
  { width: 100, height: 40, py: 8 },
  { width: 150, height: 40, py: 8 },
  { width: 75, height: 40, py: 8 }
]

function loading() {
  return (
    <div className='mx-5 flex flex-row justify-center pt-2'>
      <div className='mr-8 hidden min-w-[250px] max-w-[250px]'>
        {barStyles.map((style, index) => (
          <div
            key={index}
            className='flex justify-between border-b border-solid border-gray-100 py-2'
          >
            <LoadingBar
              width={style.width}
              height={style.height}
              py={style.py}
            />
          </div>
        ))}
      </div>
      <div className='relative w-full max-w-[900px]'>
        <div className='mb-4 mr-2 flex items-end justify-between md:items-center'>
          <div className='grid'>
            <LoadingBar width={100} height={20} />
            <div className='md:hidden'>
              <LoadingBar width={100} height={36} py={8} />
            </div>
          </div>
          <LoadingBar width={148.5} height={36} py={8} />
        </div>
        <div className='width-full grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-2 lg:grid-cols-4'>
          {Array.from({ length: 8 }, (_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default loading
