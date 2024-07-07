'use server'
import LoadingBar from '@components/specific/result/loadingBar'

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

export default async function LoadingFilters() {
  return (
    <div className='mr-8'>
      {barStyles.map((style, index) => (
        <div
          key={index}
          className='flex justify-between border-b border-solid border-gray-100 py-2'
        >
          <LoadingBar width={style.width} height={style.height} py={style.py} />
        </div>
      ))}
    </div>
  )
}
