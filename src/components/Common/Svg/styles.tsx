import React, { forwardRef } from 'react'
import cn from 'utils/cn'

const colorMap: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  tertiary: 'var(--color-light-tertiary)',
}

export const StyledIconContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { activeBackgroundColor?: string }
>(({ activeBackgroundColor, className, style, ...props }, ref) => {
  const bg = activeBackgroundColor ? (colorMap[activeBackgroundColor] || activeBackgroundColor) : 'transparent'
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ background: bg, ...style }}
      {...props}
    />
  )
})

StyledIconContainer.displayName = 'StyledIconContainer'

export const StyledAnimatedIconComponent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    isActive: boolean
    height?: string
    width?: string
    hasFillIcon: boolean
  }
>(({ isActive, height, width, hasFillIcon, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative animated-icon-component', className)}
      style={{ height, width: width || '100%' }}
      data-active={isActive}
      data-has-fill-icon={hasFillIcon}
      {...props}
    >
      {children}
    </div>
  )
})

StyledAnimatedIconComponent.displayName = 'StyledAnimatedIconComponent'
