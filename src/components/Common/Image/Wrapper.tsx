import { forwardRef } from 'react'
import { WrapperProps } from './types'

const Wrapper = forwardRef<HTMLDivElement, WrapperProps>(({ width, height, isFill, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-full h-full after:content-[''] after:block ${className ?? ''}`}
      style={{
        maxHeight: isFill ? '100%' : `${height}px`,
        maxWidth: isFill ? '100%' : `${width}px`,
        ...style,
      }}
      {...props}
    >
      <div style={{ paddingTop: `${(height / width) * 100}%` }} />
      {props.children}
    </div>
  )
})

Wrapper.displayName = 'Wrapper'

export default Wrapper
