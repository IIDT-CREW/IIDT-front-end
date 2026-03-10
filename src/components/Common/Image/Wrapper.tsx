import { forwardRef } from 'react'
import { WrapperProps } from './types'

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(
  ({ width, height, isFill, className, style, ...props }, ref) => {
    const aspectRatio = width && height ? `${(height / width) * 100}%` : undefined

    return (
      <div
        ref={ref}
        className={`relative w-full h-full after:content-[''] after:block ${className ?? ''}`}
        style={{
          maxHeight: isFill ? '100%' : height ? `${height}px` : undefined,
          maxWidth: isFill ? '100%' : width ? `${width}px` : undefined,
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
