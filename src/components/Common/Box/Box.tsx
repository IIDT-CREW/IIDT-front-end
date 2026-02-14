import { forwardRef } from 'react'
import cn from 'utils/cn'
import { BoxProps } from './types'
import { extractStyleProps } from './extractStyleProps'

const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ className, style, ...props }, ref) => {
    const { style: extractedStyle, rest } = extractStyleProps(props)
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{ ...extractedStyle, ...style }}
        {...rest}
      />
    )
  },
)

Box.displayName = 'Box'

export default Box
