import { HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

const Container: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn('mx-auto max-w-[1200px] px-4 sm:px-6', className)} {...props}>
    {children}
  </div>
)

export default Container
