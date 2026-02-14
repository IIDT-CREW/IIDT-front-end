import { forwardRef } from 'react'
import cn from 'utils/cn'

const GridLayout = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-6 gap-4',
        'sm:grid-cols-8 sm:gap-6',
        'md:grid-cols-12 md:gap-6',
        'lg:grid-cols-12 lg:gap-8',
        className,
      )}
      {...props}
    />
  ),
)

GridLayout.displayName = 'GridLayout'

export default GridLayout
