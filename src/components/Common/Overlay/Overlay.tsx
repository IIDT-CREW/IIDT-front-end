import { FC, useEffect, HTMLAttributes } from 'react'
import { cn } from '@lib/utils'

const BodyLock = () => {
  useEffect(() => {
    document.body.style.cssText = `overflow: hidden;`
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.cssText = `overflow: visible; overflow: overlay;`
    }
  }, [])

  return null
}

interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  isUnmounting?: boolean
}

export const Overlay: FC<OverlayProps> = ({ isUnmounting, className, ...props }) => {
  return (
    <>
      <BodyLock />
      <div
        role="presentation"
        className={cn(
          'fixed inset-0 w-full h-full bg-white/60 dark:bg-black/60 z-20 will-change-[opacity]',
          isUnmounting ? 'animate-out fade-out duration-350' : 'animate-in fade-in duration-350',
          className,
        )}
        {...props}
      />
    </>
  )
}

export default Overlay
