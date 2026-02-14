import { forwardRef } from 'react'
import cn from 'utils/cn'
import { FlexProps } from './types'
import { extractStyleProps } from './extractStyleProps'

const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({ className, style, ...props }, ref) => {
    const { style: extractedStyle, rest } = extractStyleProps(props)
    return (
      <div
        ref={ref}
        className={cn('flex', className)}
        style={{ ...extractedStyle, ...style }}
        {...rest}
      />
    )
  },
)

Flex.displayName = 'Flex'

export default Flex
