import { forwardRef } from 'react'
import { Button as ShadcnButton } from 'components/ui/button'
import { cn } from '@lib/utils'
import { Scale, Variant, ButtonProps } from './types'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-[var(--color-contrast)] text-[var(--color-inverted-contrast)] hover:opacity-90',
  secondary:
    'border-2 border-[var(--color-primary)] bg-transparent text-[var(--color-primary)] hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
  tertiary:
    'bg-light-tertiary text-[var(--color-primary)] hover:bg-light-tertiary/90 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/90',
  text: 'bg-transparent text-[var(--color-primary)] shadow-none hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
  danger: 'bg-failure text-white hover:bg-failure/90',
  subtle:
    'bg-light-text-subtle text-white hover:bg-light-text-subtle/90 dark:bg-dark-text-subtle dark:hover:bg-dark-text-subtle/90',
  success: 'bg-success text-white hover:bg-success/90',
  light:
    'bg-light-input text-light-text-subtle hover:bg-light-input/90 dark:bg-dark-input dark:text-dark-text-subtle dark:hover:bg-dark-input/90',
}

const scaleStyles: Record<Scale, string> = {
  md: 'h-12 px-6 text-xs xl:text-sm',
  sm: 'h-8 px-4 text-xs xl:text-sm',
  xs: 'h-5 px-2 text-[12px]',
}

const toStyleValue = (value?: string | number) => (typeof value === 'number' ? `${value}px` : value)

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다. */
const Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  (
    {
      children,
      scale = 'sm',
      variant = 'primary',
      disabled,
      className,
      style,
      width,
      m,
      mt,
      mb,
      ml,
      mr,
      p,
      pt,
      pb,
      pl,
      pr,
      as: _as,
      external: _external,
      ...rest
    },
    ref,
  ) => {
    return (
      <ShadcnButton
        ref={ref}
        type="button"
        size={scale}
        disabled={disabled}
        className={cn(
          'box-border rounded-[4px] border-none leading-none font-semibold transition-colors duration-200 disabled:opacity-100',
          variant && variantStyles[variant],
          scale && scaleStyles[scale],
          disabled && variant !== 'secondary' && 'bg-grayscale-4 hover:bg-grayscale-4',
          disabled && variant === 'secondary' && 'bg-transparent',
          className,
        )}
        style={{
          width: toStyleValue(width),
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
        {...rest}
      >
        {children}
      </ShadcnButton>
    )
  },
)

Button.displayName = 'Button'

export default Button
