import { forwardRef } from 'react'
import { cn } from '@lib/utils'
import Button from './Button'
import { ButtonProps } from './types'

const IconButton = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  ({ scale = 'md', className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        scale={scale}
        className={cn('p-0', scale === 'sm' ? 'w-8' : 'w-12', className)}
        {...props}
      />
    )
  },
)

IconButton.displayName = 'IconButton'

export default IconButton
