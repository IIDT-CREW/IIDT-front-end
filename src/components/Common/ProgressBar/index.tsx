import { HTMLAttributes } from 'react'
import cn from 'utils/cn'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  max?: number
  value?: number
  wrapperClassName?: string
}
const ProgressBar = ({ max, value, wrapperClassName, className, ...props }: ProgressProps) => {
  const safeMax = max ?? 100
  const safeValue = value ?? 0

  return (
    <div className={cn('w-full h-0.5 bg-grayscale-2', wrapperClassName)}>
      <div
        className={cn('transition-all duration-300 h-0.5 bg-grayscale-6', className)}
        style={{ width: `${(safeValue / safeMax) * 100}%` }}
        {...props}
      />
    </div>
  )
}

export default ProgressBar
