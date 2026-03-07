import { forwardRef } from 'react'
import cn from 'utils/cn'
import Text from './Text'

const TooltipText = forwardRef<HTMLDivElement, React.ComponentProps<typeof Text>>(
  ({ className, style, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn('underline decoration-dotted decoration-[var(--color-text-subtle)] underline-offset-[0.1em]', className)}
      style={style}
      {...props}
    />
  ),
)

TooltipText.displayName = 'TooltipText'

export default TooltipText
