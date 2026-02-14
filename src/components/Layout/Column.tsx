import React, { forwardRef } from 'react'
import cn from 'utils/cn'

const Column = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col justify-start', className)} {...props} />
  ),
)

Column.displayName = 'Column'

export const ColumnCenter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col justify-start w-full items-center', className)} {...props} />
  ),
)

ColumnCenter.displayName = 'ColumnCenter'

export interface AutoColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: 'sm' | 'md' | 'lg' | string
  justify?: 'stretch' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'space-between'
}

export const AutoColumn = forwardRef<HTMLDivElement, AutoColumnProps>(
  ({ gap, justify, className, style, ...props }, ref) => {
    const gapValue = gap === 'sm' ? '8px' : gap === 'md' ? '12px' : gap === 'lg' ? '24px' : gap
    return (
      <div
        ref={ref}
        className={cn('grid auto-rows-auto', className)}
        style={{ gridRowGap: gapValue, justifyItems: justify, ...style }}
        {...props}
      />
    )
  },
)

AutoColumn.displayName = 'AutoColumn'

export default Column
