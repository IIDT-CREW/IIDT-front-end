import cn from 'utils/cn'
import IconSun from '../../../../public/images/theme/Sun.svg'
import IconMoon from '../../../../public/images/theme/Moon.svg'

interface ToggleButtonProps {
  selected: boolean
}

const ThemeToggleButton = (props: ToggleButtonProps) => {
  const { selected } = props
  return (
    <button className="w-8 h-8 flex items-center justify-center border-none rounded-[2rem] cursor-pointer bg-transparent" {...props}>
      <div
        className={cn(
          'absolute transition-[visibility] duration-150 ease-out',
          selected ? 'visible animate-[fadeIn_0.15s_ease-out]' : 'invisible animate-[fadeOut_0.15s_ease-out]',
        )}
      >
        <IconMoon width="17" fill="#fff" />
      </div>
      <div
        className={cn(
          'absolute transition-[visibility] duration-150 ease-out',
          !selected ? 'visible animate-[fadeIn_0.15s_ease-out]' : 'invisible animate-[fadeOut_0.15s_ease-out]',
        )}
      >
        <IconSun width="17" fill="#000" />
      </div>
    </button>
  )
}

export default ThemeToggleButton
