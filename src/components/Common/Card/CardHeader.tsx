import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blue' | 'bubblegum' | 'violet' | 'violetAlt' | 'gold'
  p?: string
}

const variantStyles: Record<string, string> = {
  default: 'bg-card',
  blue: 'bg-gradient-to-b from-[#A7E8F1] to-[#94E1F2]',
  bubblegum: 'bg-gradient-to-br from-[#E5FDFF] to-[#F3EFFF] dark:from-[#313D5C] dark:to-[#3D2A54]',
  violet: 'bg-gradient-to-b from-[#E2C9FB] to-[#CDB8FA]',
  violetAlt: 'bg-gradient-to-b from-[#CBD7EF] to-[#9A9FD0]',
  gold: 'bg-gradient-to-b from-[#FFD800] to-[#FDAB32]',
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, variant = 'default', p = '24px', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-t-card', variantStyles[variant], className)}
      style={{ padding: p, ...style }}
      {...props}
    />
  ),
)

CardHeader.displayName = 'CardHeader'

export default CardHeader
