import cn from 'utils/cn'
import EarthIcon from '../../public/images/write/earth.svg'
import LockIcon from '../../public/images/write/lock.svg'

type PrivateToggleProps = {
  isPrivate: boolean
  handleSetIsPrivate: () => void
}
const PrivateToggle = ({ isPrivate, handleSetIsPrivate }: PrivateToggleProps) => {
  return (
    <button
      onClick={handleSetIsPrivate}
      className={cn(
        'mx-[5px] transition-all duration-250 ease-out delay-100 border border-[#d1d5da] rounded-[30px] cursor-pointer',
        'flex text-[0.5rem] justify-between items-center overflow-hidden p-2 z-[1] w-16 h-8',
        !isPrivate ? 'bg-grayscale-7' : 'bg-grayscale-5',
        '[&>*:first-child>svg]:transition-all [&>*:first-child>svg]:duration-250 [&>*:first-child>svg]:ease-out [&>*:first-child>svg]:delay-100',
        '[&>*:last-child>svg]:transition-all [&>*:last-child>svg]:duration-250 [&>*:last-child>svg]:ease-out [&>*:last-child>svg]:delay-100',
      )}
    >
      <span
        style={{
          opacity: !isPrivate ? 1 : 0,
          transform: !isPrivate ? 'translateX(0)' : 'translateX(2rem)',
          transition: 'all 0.25s ease 0.1s',
        }}
      >
        <EarthIcon />
      </span>
      <span
        style={{
          opacity: isPrivate ? 1 : 0,
          transform: isPrivate ? 'translateX(0)' : 'translateX(-2rem)',
          transition: 'all 0.25s ease 0.1s',
        }}
      >
        <LockIcon />
      </span>
    </button>
  )
}

export default PrivateToggle
