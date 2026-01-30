import { forwardRef, HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  isSuccess?: boolean
  isWarning?: boolean
  isDisabled?: boolean
  borderBackground?: string
  background?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, background, isActive, isSuccess, isWarning, isDisabled, borderBackground, className, style, ...props }, ref) => {
    // Determine border/background color
    const getBorderStyle = () => {
      if (borderBackground) return { background: borderBackground }
      if (isWarning) return { background: '#FFB237' } // warning color
      if (isSuccess) return { background: '#31D0AA' } // success color
      if (isActive) return { background: 'linear-gradient(180deg, #FFFFFF, #7645D9)' }
      return {}
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-card overflow-hidden relative cursor-pointer p-[1px_1px_3px_1px]',
          'bg-card-border',
          isDisabled ? 'text-light-text-disabled dark:text-dark-text-disabled' : 'text-foreground',
          isActive && 'animate-[promotedGradient_1.5s_ease_infinite] bg-[length:400%_400%]',
          className,
        )}
        style={{ ...getBorderStyle(), ...style }}
        {...props}
      >
        <div
          className={cn(
            'w-full h-full rounded-card',
            borderBackground ? 'overflow-visible' : 'overflow-inherit',
            'bg-background',
          )}
          style={background ? { background } : undefined}
        >
          {children}
        </div>
      </div>
    )
  },
)

Card.displayName = 'Card'

export default Card
