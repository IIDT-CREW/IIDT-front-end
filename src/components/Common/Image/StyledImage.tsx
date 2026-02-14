import React, { useEffect, useRef, useState } from 'react'
import cn from 'utils/cn'
import observerOptions from './options'
import Wrapper from './Wrapper'
import { ImageProps } from './types'
import { Skeleton } from '../Skeleton'
import Placeholder from './Placeholder'

const StyledImg = ({
  isImageLoaded,
  objectFit,
  position,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  isImageLoaded: boolean
  objectFit: string
  position: 'absolute' | 'fixed'
}) => (
  <img
    className={cn(
      'h-full left-0 top-0 w-full transition-opacity duration-[600ms]',
      isImageLoaded ? 'opacity-100' : 'opacity-30',
      className,
    )}
    style={{ position, objectFit }}
    {...props}
  />
)

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  isFill = false,
  objectFit = 'cover',
  position = 'absolute',
  ...props
}) => {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [isImageLoadError, setIsImageLoadError] = useState(false)

  useEffect(() => {
    let observer: IntersectionObserver
    const isSupported = typeof window === 'object' && window.IntersectionObserver

    if (imgRef.current && isSupported) {
      observer = new window.IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const { isIntersecting } = entry
          if (isIntersecting) {
            setIsLoaded(true)

            if (typeof observer?.disconnect === 'function') {
              observer.disconnect()
            }
          }
        })
      }, observerOptions)
      observer.observe(imgRef.current)
    }

    return () => {
      if (typeof observer?.disconnect === 'function') {
        observer.disconnect()
      }
    }
  }, [src])

  return (
    <Wrapper ref={imgRef} height={height} width={width} {...props}>
      {isLoaded && (
        <>
          <StyledImg
            isImageLoaded={isImageLoaded}
            src={src}
            alt={alt}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoadError(true)}
            objectFit={objectFit}
            position={position}
          />
          {!isImageLoaded && !isImageLoadError && (
            <Skeleton animation={'pulse'} width={isFill ? '100%' : width} height={isFill ? '100%' : height} />
          )}
        </>
      )}
      <Placeholder isVisible={isImageLoadError} />
    </Wrapper>
  )
}

export default Image
