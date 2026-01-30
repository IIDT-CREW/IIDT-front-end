import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  p?: string
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(({ className, p = '24px', style, ...props }, ref) => (
  <div ref={ref} className={cn(className)} style={{ padding: p, ...style }} {...props} />
))

CardFooter.displayName = 'CardFooter'

export default CardFooter
