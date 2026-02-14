import { WrapperProps } from './types'

const ImageWrapper = ({ width, height, className, style, ...props }: WrapperProps) => {
  return (
    <div
      className={`relative w-full after:content-[''] after:block ${className ?? ''}`}
      style={{
        maxHeight: `${height}px`,
        maxWidth: `${width}px`,
        ...style,
      }}
      {...props}
    >
      <div style={{ paddingTop: `${(height / width) * 100}%` }} />
      {props.children}
    </div>
  )
}

export default ImageWrapper
