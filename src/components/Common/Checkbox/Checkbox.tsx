import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'
import { Checkbox as ShadcnCheckbox } from 'components/ui/checkbox'
import cn from 'utils/cn'
import { CheckboxProps, scales } from './types'

const scaleMap = {
  [scales.SM]: 'size-6 rounded-md',
  [scales.MD]: 'size-8 rounded-lg',
}

const Checkbox = forwardRef<
  ElementRef<typeof ShadcnCheckbox>,
  CheckboxProps & ComponentPropsWithoutRef<typeof ShadcnCheckbox>
>(({ scale = scales.MD, className, ...props }, ref) => (
  <ShadcnCheckbox
    ref={ref}
    className={cn(
      'border-0 bg-[var(--color-surface-input)] shadow-[inset_0px_2px_2px_-1px_rgba(74,74,104,0.1)]',
      'data-[state=checked]:border-[var(--color-success,#31d0aa)] data-[state=checked]:bg-[var(--color-success,#31d0aa)] data-[state=checked]:text-white',
      'focus-visible:ring-[3px] focus-visible:ring-[#7645d9]/60 focus-visible:border-[#7645d9]',
      scaleMap[scale] || scaleMap[scales.MD],
      className,
    )}
    {...props}
  />
))

Checkbox.displayName = 'Checkbox'

export default Checkbox
