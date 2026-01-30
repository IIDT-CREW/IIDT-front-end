import { ButtonHTMLAttributes, forwardRef } from 'react'
import cn from 'utils/cn'

export type TwButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'text' | 'danger' | 'subtle' | 'success' | 'light'

export type TwButtonScale = 'md' | 'sm' | 'xs'

export interface TwButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TwButtonVariant
  scale?: TwButtonScale
}

const variantStyles: Record<TwButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10 disabled:bg-transparent',
  tertiary: 'bg-light-tertiary dark:bg-dark-tertiary text-primary',
  text: 'bg-transparent text-primary shadow-none hover:bg-primary/10',
  danger: 'bg-failure text-white hover:bg-failure/90',
  subtle: 'bg-light-text-subtle dark:bg-dark-text-subtle text-light-bg dark:text-dark-bg',
  success: 'bg-success text-white hover:bg-success/90',
  light: 'bg-light-input dark:bg-dark-input text-light-text-subtle dark:text-dark-text-subtle',
}

const scaleStyles: Record<TwButtonScale, string> = {
  md: 'h-12 px-6 text-sm',
  sm: 'h-8 px-4 text-sm',
  xs: 'h-5 px-2 text-xs',
}

/**
 * Tailwind-based Button component
 * Replacement for styled-components Button
 */
const TwButton = forwardRef<HTMLButtonElement, TwButtonProps>(
  ({ variant = 'primary', scale = 'md', className, children, disabled, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'rounded font-semibold',
          'outline-none border-none',
          'cursor-pointer',
          'transition-colors duration-200',
          // Variant styles
          variantStyles[variant],
          // Scale styles
          scaleStyles[scale],
          // Disabled styles
          disabled && 'bg-grayscale-4 cursor-not-allowed opacity-60',
          // Custom className
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

TwButton.displayName = 'TwButton'

export default TwButton
