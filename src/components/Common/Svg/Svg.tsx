import { forwardRef } from 'react'
import cn from 'utils/cn'
import { SvgProps } from './types'

const colorMap: Record<string, string> = {
  text: 'var(--color-text)',
  textSubtle: 'var(--color-text-subtle)',
  textSecondary: 'var(--color-text-secondary)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  failure: 'var(--color-failure)',
}

const Svg = forwardRef<SVGSVGElement, SvgProps>(
  ({ color = 'text', width = '20px', spin = false, className, style, ...props }, ref) => {
    const fillColor = colorMap[color as string] || color
    return (
      <svg
        ref={ref}
        className={cn(
          'self-center shrink-0',
          spin && 'animate-[rotate_2s_linear_infinite]',
          className,
        )}
        style={{ fill: fillColor, ...style }}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      />
    )
  },
)

Svg.displayName = 'Svg'

export default Svg
