import { BarProps } from "@interfaces/loadingBar.interfaces"

const loadingBar: React.FC<BarProps> = ({ width, height, py }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      paddingTop: `${py}px`,
      paddingBottom: `${py}px`
    }}
  >
    <div className='h-full w-full animate-pulse rounded bg-slate-200' />
  </div>
)

export default loadingBar
