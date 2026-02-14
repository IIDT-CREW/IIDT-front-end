import cn from 'utils/cn'
import { ButtonProps } from './types'

interface ToggleButtonProps {
  selected: boolean
}

const ToggleButton = (props: ButtonProps | ToggleButtonProps) => {
  const { selected } = props as ToggleButtonProps
  return (
    <button
      className={cn(
        'w-14 h-8 block relative border-none rounded-[2rem] cursor-pointer transition-all duration-200 ease-in shadow-[0_0_1rem_3px_rgba(0,0,0,0.15)]',
        selected ? 'bg-[#fdb11a]' : 'bg-white',
      )}
      {...props}
    >
      <span
        className={cn(
          'w-[1.6rem] h-[1.6rem] absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-in',
          selected ? 'bg-white' : 'bg-[#fdb11a]',
        )}
        style={{ left: selected ? 'calc(100% - 1.8rem)' : '0.2rem' }}
      />
    </button>
  )
}

export default ToggleButton
