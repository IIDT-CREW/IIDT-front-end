import { forwardRef } from 'react'
import { Input as ShadcnInput } from 'components/ui/input'
import { cn } from '@lib/utils'
import { InputProps, scales, Scales } from './types'

const scaleStyles: Record<Scales, string> = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
}

const toStyleValue = (value?: string | number) => (typeof value === 'number' ? `${value}px` : value)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ scale = scales.MD, isSuccess = false, isWarning = false, className, label, form, style, m, mt, mb, ml, mr, p, pt, pb, pl, pr, ...props }, ref) => {
    const inputElement = (
      <ShadcnInput
        ref={ref}
        className={cn(
          'w-full rounded px-4 text-base',
          'bg-light-input dark:bg-dark-input',
          'border border-light-input-secondary dark:border-dark-input-secondary',
          'text-foreground',
          'placeholder:text-light-text-subtle dark:placeholder:text-dark-text-subtle',
          scaleStyles[scale],
          isWarning && 'shadow-warning',
          isSuccess && 'shadow-success',
          !isWarning && !isSuccess && 'shadow-inset',
          'focus-visible:ring-0 focus-visible:shadow-focus',
          'disabled:bg-light-bg-disabled dark:disabled:bg-dark-bg-disabled',
          'disabled:text-light-text-disabled dark:disabled:text-dark-text-disabled',
          'disabled:shadow-none',
          className,
        )}
        style={{
          margin: toStyleValue(m),
          marginTop: toStyleValue(mt),
          marginBottom: toStyleValue(mb),
          marginLeft: toStyleValue(ml),
          marginRight: toStyleValue(mr),
          padding: toStyleValue(p),
          paddingTop: toStyleValue(pt),
          paddingBottom: toStyleValue(pb),
          paddingLeft: toStyleValue(pl),
          paddingRight: toStyleValue(pr),
          ...style,
        }}
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
