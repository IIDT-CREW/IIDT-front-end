import { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@lib/utils'
import { InputProps, scales, Scales } from './types'

const scaleStyles: Record<Scales, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ scale = scales.MD, isSuccess = false, isWarning = false, className, label, form, ...props }, ref) => {
    const inputElement = (
      <input
        ref={ref}
        className={cn(
          // Base styles
          'block w-full rounded px-4 text-base outline-none',
          'bg-light-input dark:bg-dark-input',
          'border border-light-input-secondary dark:border-dark-input-secondary',
          'text-foreground',
          'placeholder:text-light-text-subtle dark:placeholder:text-dark-text-subtle',
          // Scale
          scaleStyles[scale],
          // States
          isWarning && 'shadow-warning',
          isSuccess && 'shadow-success',
          !isWarning && !isSuccess && 'shadow-inset',
          // Focus
          'focus:shadow-focus focus:not-disabled',
          // Disabled
          'disabled:bg-light-bg-disabled dark:disabled:bg-dark-bg-disabled',
          'disabled:text-light-text-disabled dark:disabled:text-dark-text-disabled',
          'disabled:cursor-not-allowed disabled:shadow-none',
          // Custom
          className,
        )}
        {...form}
        {...props}
      />
    )

    if (label) {
      return (
        <div>
          <label className="block">
            <span className="block text-sm text-gray-500 mb-1">{label}</span>
            {inputElement}
          </label>
        </div>
      )
    }

    return inputElement
  },
)

Input.displayName = 'Input'

export default Input
