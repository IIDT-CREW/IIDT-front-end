import Link from 'next/link'
import cn from 'utils/cn'

type MenuItemProps = {
  isActive: boolean
  children: React.ReactNode
  href: string
}
const MenuItem = ({ isActive, children, href }: MenuItemProps) => {
  return (
    <div
      className={cn(
        'z-[9999] mx-[10px] cursor-pointer items-center text-[12px] leading-none hover:bg-[var(--color-tertiary)]',
        'sm:text-[14px] lg:text-[18px]',
        isActive ? 'font-semibold' : 'font-normal',
      )}
    >
      <Link href={href} className="block whitespace-nowrap">
        {children}
      </Link>
    </div>
  )
}

export default MenuItem
