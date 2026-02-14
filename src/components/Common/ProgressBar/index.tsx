import { HTMLAttributes } from 'react'
import cn from 'utils/cn'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  max?: number
  value?: number
  wrapperClassName?: string
}
const ProgressBar = ({ max, value, wrapperClassName, className, ...props }: ProgressProps) => {
  return (
    <div className={cn('w-full h-0.5 bg-grayscale-2', wrapperClassName)}>
      <div
        className={cn('transition-all duration-300 h-0.5 bg-grayscale-6', className)}
        style={{ width: `${(value / max) * 100}%` }}
        {...props}
      />
    </div>
  )
}

export default ProgressBar
