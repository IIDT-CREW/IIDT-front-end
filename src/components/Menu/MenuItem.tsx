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
        'flex items-center rounded px-3 py-2 text-xs leading-none cursor-pointer z-[9999] hover:bg-[var(--color-tertiary)]',
        'sm:text-sm lg:text-lg',
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
