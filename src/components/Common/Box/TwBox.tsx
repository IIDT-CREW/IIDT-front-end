import { forwardRef, HTMLAttributes } from 'react'
import cn from 'utils/cn'

export interface TwBoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
}

/**
 * Tailwind-based Box component
 * Use className for styling instead of styled-system props
 *
 * Example migration:
 * Before: <Box p={4} m={2} bg="primary" />
 * After: <TwBox className="p-4 m-2 bg-primary" />
 */
const TwBox = forwardRef<HTMLDivElement, TwBoxProps>(({ as: Component = 'div', className, children, ...rest }, ref) => {
  // @ts-expect-error - dynamic element type
  return (
    <Component ref={ref} className={cn(className)} {...rest}>
      {children}
    </Component>
  )
})

TwBox.displayName = 'TwBox'

export default TwBox

/**
 * Tailwind-based Flex component
 */
export const TwFlex = forwardRef<HTMLDivElement, TwBoxProps>(({ className, children, ...rest }, ref) => {
  return (
    <TwBox ref={ref} className={cn('flex', className)} {...rest}>
      {children}
    </TwBox>
  )
})

TwFlex.displayName = 'TwFlex'

/**
 * Tailwind-based Grid component
 */
export const TwGrid = forwardRef<HTMLDivElement, TwBoxProps>(({ className, children, ...rest }, ref) => {
  return (
    <TwBox ref={ref} className={cn('grid', className)} {...rest}>
      {children}
    </TwBox>
  )
})

TwGrid.displayName = 'TwGrid'
