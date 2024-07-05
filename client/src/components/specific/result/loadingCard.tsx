const loadingCard: React.FC = () => (
  <div className='grid max-w-[400px] pb-2 pr-2'>
    <div className='relative animate-pulse bg-slate-200 pb-[150%]' />
    <div className='pt-5'>
      <div className='mb-1 h-[16px] w-[75px] animate-pulse rounded bg-slate-200' />
      <div className='mb-1 h-[16px] animate-pulse rounded bg-slate-200' />
      <div className='h-[16px] w-[75px] animate-pulse rounded bg-slate-200' />
    </div>
    <div className='mb-4 py-1'>
      <div className='h-[20px] w-[95px] animate-pulse rounded bg-slate-200' />
    </div>
    <div>
      <div className='grid justify-between gap-4'>
        <div className='flex flex-wrap items-center'>
          <div className='border-grey mr-2 h-6 w-6 animate-pulse overflow-hidden rounded-full border bg-slate-200' />
          <div className='border-grey mr-2 h-6 w-6 animate-pulse overflow-hidden rounded-full border bg-slate-200' />
        </div>
      </div>
    </div>
  </div>
)

export default loadingCard
