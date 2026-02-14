import { forwardRef } from 'react'
import cn from 'utils/cn'
import Text from './Text'

const TooltipText = forwardRef<HTMLDivElement, React.ComponentProps<typeof Text>>(
  ({ className, style, ...props }, ref) => (
    <Text
      ref={ref}
      className={cn(className)}
      style={{
        textDecoration: `underline dotted var(--color-text-subtle)`,
        textUnderlineOffset: '0.1em',
        ...style,
      }}
      {...props}
    />
  ),
)

TooltipText.displayName = 'TooltipText'

export default TooltipText
