import { forwardRef } from 'react'
import cn from 'utils/cn'
import BaseLayout from './BaseLayout'

const CardsLayout = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <BaseLayout
      ref={ref}
      className={cn(
        '[&>div]:col-span-6 sm:[&>div]:col-span-4',
        className,
      )}
      {...props}
    />
  ),
)

CardsLayout.displayName = 'CardsLayout'

export default CardsLayout
