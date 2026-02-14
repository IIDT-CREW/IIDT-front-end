import { AnimatePresence, domAnimation, LazyMotion, m as Motion } from 'framer-motion'
import React, { forwardRef, useRef } from 'react'
import cn from 'utils/cn'
import { animation as ANIMATION, SkeletonProps, SkeletonV2Props, variant as VARIANT } from './types'
import {
  animationVariants,
  animationMap,
  animationHandler,
} from '../../../utils/animationToolkit'

const Root = forwardRef<HTMLDivElement, SkeletonProps & { className?: string; style?: React.CSSProperties }>(
  ({ variant = VARIANT.RECT, width, height, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'min-h-5 block bg-light-bg-disabled dark:bg-dark-bg-disabled',
        variant === VARIANT.CIRCLE ? 'rounded-full' : 'rounded-small',
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
)
Root.displayName = 'Root'

const PulseComponent = forwardRef<HTMLDivElement, SkeletonProps & { style?: React.CSSProperties }>(
  (props, ref) => (
    <Root
      ref={ref}
      className="animate-[skeletonPulse_2s_infinite_ease-out] [transform:translate3d(0,0,0)]"
      {...props}
    />
  ),
)
PulseComponent.displayName = 'PulseComponent'

const WavesComponent = forwardRef<HTMLDivElement, SkeletonProps & { style?: React.CSSProperties }>(
  (props, ref) => (
    <Root
      ref={ref}
      className="overflow-hidden [transform:translate3d(0,0,0)] before:content-[''] before:absolute before:bg-gradient-to-r before:from-transparent before:via-[rgba(243,243,243,0.5)] before:to-transparent before:top-0 before:-left-[150px] before:h-full before:w-[150px] before:animate-[skeletonWaves_2s_cubic-bezier(0.4,0,0.2,1)_infinite]"
      {...props}
    />
  ),
)
WavesComponent.displayName = 'WavesComponent'

const Skeleton: React.FC<SkeletonProps> = ({ variant = VARIANT.RECT, animation = ANIMATION.PULSE, ...props }) => {
  if (animation === ANIMATION.WAVES) {
    return <WavesComponent variant={variant} {...props} />
  }

  return <PulseComponent variant={variant} {...props} />
}

export const SkeletonV2: React.FC<SkeletonV2Props> = ({
  variant = VARIANT.RECT,
  animation = ANIMATION.PULSE,
  isDataReady = false,
  children,
  wrapperProps,
  skeletonTop = '0',
  skeletonLeft = '0',
  width,
  height,
  mr,
  ml,
  mb,
  ...props
}) => {
  const animationRef = useRef<HTMLDivElement>(null)
  const skeletonRef = useRef<HTMLDivElement>(null)
  return (
    <div
      className="relative"
      style={{ width, height, marginRight: mr as any, marginLeft: ml as any, marginBottom: mb as any }}
      {...wrapperProps}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isDataReady && (
            <Motion.div
              key="content"
              ref={animationRef}
              onAnimationStart={() => animationHandler(animationRef.current)}
              {...animationMap}
              variants={animationVariants}
              transition={{ duration: 0.3 }}
              className="relative will-change-[opacity] opacity-0 [&.appear]:animate-[appearAnimation_0.3s_ease-in-out_forwards] [&.disappear]:animate-[disappearAnimation_0.3s_ease-in-out_forwards]"
              style={{ width: width || '100%', height: height || '100%' }}
            >
              {children}
            </Motion.div>
          )}
          {!isDataReady && (
            <Motion.div
              key="skeleton"
              style={{ position: 'absolute', top: skeletonTop, left: skeletonLeft, width: width || '100%', height: height || '100%' }}
              ref={skeletonRef}
              onAnimationStart={() => animationHandler(skeletonRef.current)}
              {...animationMap}
              variants={animationVariants}
              transition={{ duration: 0.3 }}
              className="relative will-change-[opacity] opacity-0 [&.appear]:animate-[appearAnimation_0.3s_ease-in-out_forwards] [&.disappear]:animate-[disappearAnimation_0.3s_ease-in-out_forwards]"
            >
              {animation === ANIMATION.WAVES ? (
                <WavesComponent variant={variant} {...props} width={width} height={height} />
              ) : (
                <PulseComponent variant={variant} {...props} width={width} height={height} />
              )}
            </Motion.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}

export default Skeleton
