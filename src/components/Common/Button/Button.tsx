import { forwardRef } from 'react'
import { Button as ShadcnButton } from 'components/ui/button'
import { cn } from '@lib/utils'
import { Scale, Variant, ButtonProps } from './types'

const variantStyles: Record<Variant, string> = {
  primary: 'bg-grayscale-7 text-white hover:bg-grayscale-6',
  secondary: 'border-2 border-primary bg-transparent text-primary hover:bg-primary/10',
  tertiary: 'bg-light-tertiary text-primary hover:bg-light-tertiary/90 dark:bg-dark-tertiary dark:hover:bg-dark-tertiary/90',
  text: 'bg-transparent text-primary shadow-none hover:bg-primary/10',
  danger: 'bg-failure text-white hover:bg-failure/90',
  subtle: 'bg-light-text-subtle text-white hover:bg-light-text-subtle/90 dark:bg-dark-text-subtle dark:hover:bg-dark-text-subtle/90',
  success: 'bg-success text-white hover:bg-success/90',
  light: 'bg-light-input text-light-text-subtle hover:bg-light-input/90 dark:bg-dark-input dark:text-dark-text-subtle dark:hover:bg-dark-input/90',
}

const scaleStyles: Record<Scale, string> = {
  md: 'h-12 px-6',
  sm: 'h-8 px-4',
  xs: 'h-5 px-2 text-xs',
}

const toStyleValue = (value?: string | number) => (typeof value === 'number' ? `${value}px` : value)

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다. */
const Button = forwardRef<HTMLButtonElement, ButtonProps<'button'>>(
  ({
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
  }, ref) => {
    return (
      <ShadcnButton
        ref={ref}
        type="button"
        size={scale}
        disabled={disabled}
        className={cn(
          'rounded font-semibold transition-colors duration-200',
          variant && variantStyles[variant],
          scale && scaleStyles[scale],
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
