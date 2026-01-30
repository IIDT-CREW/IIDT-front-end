import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  p?: string
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(({ className, p = '24px', style, ...props }, ref) => (
  <div ref={ref} className={cn(className)} style={{ padding: p, ...style }} {...props} />
))

CardBody.displayName = 'CardBody'

export default CardBody
