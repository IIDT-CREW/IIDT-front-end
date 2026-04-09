import { forwardRef } from 'react'
import { WrapperProps } from './types'

const toCssDimension = (value?: string | number) => {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ width, height, isFill, className, style, ...props }, ref) => {
    const hasNumericSize = typeof width === 'number' && typeof height === 'number'
    const aspectRatio = hasNumericSize ? `${(height / width) * 100}%` : undefined

    return (
      <div
        ref={ref}
        className={`relative w-full h-full after:content-[''] after:block ${className ?? ''}`}
        style={{
          maxHeight: isFill ? '100%' : toCssDimension(height),
          maxWidth: isFill ? '100%' : toCssDimension(width),
          ...style,
        }}
        {...props}
      >
        {!isFill && aspectRatio && <div style={{ paddingTop: aspectRatio }} />}
        {props.children}
      </div>
    )
  },
)

Wrapper.displayName = 'Wrapper'

export default Wrapper
