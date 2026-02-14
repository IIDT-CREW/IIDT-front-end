import React, { forwardRef } from 'react'
import cn from 'utils/cn'

const FlexLayout = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex justify-center flex-wrap [&>*]:min-w-[280px] [&>*]:max-w-[31.5%] [&>*]:w-full [&>*]:mx-2 [&>*]:mb-8',
        className,
      )}
      {...props}
    />
  ),
)

FlexLayout.displayName = 'FlexLayout'

export interface FlexGapProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: string
  rowGap?: string
  columnGap?: string
}

export const FlexGap = forwardRef<HTMLDivElement, FlexGapProps>(
  ({ gap, rowGap, columnGap, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex', className)}
      style={{ gap, rowGap, columnGap, ...style }}
      {...props}
    />
  ),
)

FlexGap.displayName = 'FlexGap'

export default FlexLayout
