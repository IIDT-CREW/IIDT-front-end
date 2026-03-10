import { forwardRef } from 'react'
import cn from 'utils/cn'

const TooltipText = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('underline decoration-dotted decoration-[var(--color-text-subtle)] underline-offset-[0.1em]', className)}
      style={style}
      {...props}
    />
  ),
)

TooltipText.displayName = 'TooltipText'

export default TooltipText
