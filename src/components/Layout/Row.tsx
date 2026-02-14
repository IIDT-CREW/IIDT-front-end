import React, { forwardRef } from 'react'
import cn from 'utils/cn'

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  align?: string
  justify?: string
  padding?: string
  border?: string
  borderRadius?: string
}

const Row = forwardRef<HTMLDivElement, RowProps>(
  ({ width, align, justify, padding, border, borderRadius, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex', className)}
      style={{
        width: width ?? '100%',
        alignItems: align ?? 'center',
        justifyContent: justify ?? 'flex-start',
        padding: padding ?? '0',
        border,
        borderRadius,
        ...style,
      }}
      {...props}
    />
  ),
)

Row.displayName = 'Row'

export const RowBetween = forwardRef<HTMLDivElement, RowProps>(
  ({ className, ...props }, ref) => (
    <Row ref={ref} className={className} justify="space-between" {...props} />
  ),
)

RowBetween.displayName = 'RowBetween'

export const RowFlat = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-end', className)} {...props} />
  ),
)

RowFlat.displayName = 'RowFlat'

export interface AutoRowProps extends RowProps {
  gap?: string
}

export const AutoRow = forwardRef<HTMLDivElement, AutoRowProps>(
  ({ gap, justify, className, style, ...props }, ref) => (
    <Row
      ref={ref}
      className={cn('flex-wrap', className)}
      justify={justify}
      style={{
        margin: gap ? `-${gap}` : undefined,
        ...style,
      }}
      {...props}
    />
  ),
)

AutoRow.displayName = 'AutoRow'

export const RowFixed = forwardRef<HTMLDivElement, AutoRowProps>(
  ({ gap, justify, className, style, ...props }, ref) => (
    <Row
      ref={ref}
      className={cn('w-fit', className)}
      justify={justify}
      style={{
        margin: gap ? `-${gap}` : undefined,
        ...style,
      }}
      {...props}
    />
  ),
)

RowFixed.displayName = 'RowFixed'

export default Row
