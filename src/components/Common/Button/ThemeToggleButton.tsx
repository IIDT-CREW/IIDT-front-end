import { cn } from 'utils/cn'
import IconSun from '../../../../public/images/theme/Sun.svg'
import IconMoon from '../../../../public/images/theme/Moon.svg'

interface ToggleButtonProps {
  selected: boolean
}

const ThemeToggleButton = ({
  selected,
  ...props
}: ToggleButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="relative flex h-8 w-8 items-center justify-center rounded-[2rem] border-none bg-transparent"
      aria-label={selected ? '라이트 모드로 전환' : '다크 모드로 전환'}
      {...props}
    >
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
