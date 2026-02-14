import { forwardRef } from 'react'
import cn from 'utils/cn'
import { CheckboxProps, scales } from './types'

const scaleMap = {
  [scales.SM]: 'h-6 w-6',
  [scales.MD]: 'h-8 w-8',
}

const Checkbox = forwardRef<
  HTMLInputElement,
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ scale = scales.MD, className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      'appearance-none overflow-hidden cursor-pointer relative inline-block align-middle',
      'transition-colors duration-200 ease-in-out border-0 rounded-lg',
      'bg-[var(--color-input)]',
      'shadow-[inset_0px_2px_2px_-1px_rgba(74,74,104,0.1)]',
      'after:content-[""] after:absolute after:border-b-2 after:border-l-2 after:border-transparent',
      'after:top-[30%] after:left-0 after:right-0 after:w-1/2 after:h-1/4 after:m-auto',
      'after:-rotate-[50deg] after:transition-colors after:duration-200 after:ease-in-out',
      'hover:not-disabled:not-checked:shadow-[0px_0px_0px_1px_#7645D9,0px_0px_0px_4px_rgba(118,69,217,0.6)]',
      'focus:outline-none focus:shadow-[0px_0px_0px_1px_#7645D9,0px_0px_0px_4px_rgba(118,69,217,0.6)]',
      'checked:bg-[var(--color-success,#31d0aa)] checked:after:border-white',
      'disabled:cursor-default disabled:opacity-60',
      scaleMap[scale] || scaleMap[scales.MD],
      className,
    )}
    {...props}
  />
))

Checkbox.displayName = 'Checkbox'

export default Checkbox
