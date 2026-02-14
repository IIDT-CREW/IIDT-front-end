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
        'text-xs mx-2.5 items-center cursor-pointer z-[9999] hover:bg-[var(--color-tertiary)]',
        'sm:text-sm lg:text-lg',
        isActive ? 'font-semibold' : 'font-normal',
      )}
    >
      <Link href={href}>{children}</Link>
    </div>
  )
}

export default MenuItem
