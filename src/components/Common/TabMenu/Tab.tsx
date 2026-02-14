import { forwardRef } from 'react'
import cn from 'utils/cn'
import { TabProps } from './types'

const Tab = forwardRef<HTMLButtonElement, TabProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ scale = 'md', className, color, backgroundColor, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex justify-center cursor-pointer border-0 outline-0 grow text-base font-semibold md:grow-0',
          scale === 'md' ? 'p-2 rounded-t' : 'p-4 rounded-t-lg',
          className,
        )}
        style={{ color, backgroundColor }}
        {...props}
      />
    )
  },
)

Tab.displayName = 'Tab'

export default Tab
