import { forwardRef } from 'react'
import cn from 'utils/cn'
import { GridProps } from './types'
import { extractStyleProps } from './extractStyleProps'

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, style, ...props }, ref) => {
    const { style: extractedStyle, rest } = extractStyleProps(props)
    return (
      <div
        ref={ref}
        className={cn('grid', className)}
        style={{ ...extractedStyle, ...style }}
        {...rest}
      />
    )
  },
)

Grid.displayName = 'Grid'

export default Grid
