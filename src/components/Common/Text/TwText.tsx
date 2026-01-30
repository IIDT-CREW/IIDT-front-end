import { forwardRef, HTMLAttributes } from 'react'
import cn from 'utils/cn'

export interface TwTextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
  bold?: boolean
  small?: boolean
  ellipsis?: boolean
  color?: 'primary' | 'secondary' | 'subtle' | 'disabled' | 'error' | 'success'
}

const colorStyles: Record<string, string> = {
  primary: 'text-theme-text',
  secondary: 'text-theme-text-secondary',
  subtle: 'text-theme-text-subtle',
  disabled: 'text-light-text-disabled dark:text-dark-text-disabled',
  error: 'text-error',
  success: 'text-success',
}

/**
 * Tailwind-based Text component
 *
 * Example migration:
 * Before: <Text bold color="textSubtle" fontSize="14px" />
 * After: <TwText bold color="subtle" className="text-sm" />
 */
const TwText = forwardRef<HTMLElement, TwTextProps>(
  ({ as: Component = 'div', bold, small, ellipsis, color = 'primary', className, children, ...rest }, ref) => {
    // @ts-expect-error - dynamic element type
    return (
      <Component
        ref={ref}
        className={cn(
          // Base styles
          'leading-relaxed',
          // Font weight
          bold ? 'font-semibold' : 'font-normal',
          // Font size
          small ? 'text-sm' : 'text-lg',
          // Ellipsis
          ellipsis && 'whitespace-nowrap overflow-hidden text-ellipsis',
          // Color
          colorStyles[color],
          // Custom className
          className,
        )}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)

TwText.displayName = 'TwText'

export default TwText
