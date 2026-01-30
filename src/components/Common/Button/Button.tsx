import { forwardRef } from 'react'
import { cn } from '@lib/utils'
import { Scale, Variant, ButtonProps } from './types'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-grayscale-7 text-white hover:bg-grayscale-6',
  secondary: 'bg-transparent border-2 border-primary text-primary hover:bg-primary/10 disabled:bg-transparent',
  tertiary: 'bg-light-tertiary dark:bg-dark-tertiary text-primary',
  text: 'bg-transparent text-primary shadow-none hover:bg-primary/10',
  danger: 'bg-failure text-white hover:bg-failure/90',
  subtle: 'bg-light-text-subtle dark:bg-dark-text-subtle text-white',
  success: 'bg-success text-white hover:bg-success/90',
  light: 'bg-light-input dark:bg-dark-input text-light-text-subtle dark:text-dark-text-subtle',
}

const scaleStyles: Record<Scale, string> = {
  md: 'h-12 px-6',
  sm: 'h-8 px-4',
  xs: 'h-5 px-2 text-xs',
}

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다. */
const Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  ({ children, scale = 'sm', variant = 'primary', disabled, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'outline-none border-none box-border',
          'text-xs xl:text-sm font-semibold leading-none',
          'rounded cursor-pointer',
          'transition-colors duration-200',
          // Variant styles
          variant && variantStyles[variant],
          // Scale styles
          scale && scaleStyles[scale],
          // Disabled styles
          disabled && 'bg-grayscale-4 cursor-not-allowed',
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

Button.displayName = 'Button'

export default Button
