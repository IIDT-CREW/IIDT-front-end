import { useEffect, useRef, useState, type ComponentPropsWithoutRef, type FC, type HTMLAttributes } from 'react'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { DROPDOWN_MENU_ITEM_TYPE, DropdownMenuProps } from './types'
import Link from 'next/link'
import { cn } from 'utils/cn'

export const StyledDropdownMenu = ({
  isOpen,
  isBottomNav,
  className,
  style,
  ...props
}: HTMLAttributes<HTMLDivElement> & { isOpen: boolean; isBottomNav: boolean }) => (
  <div
    className={cn(
      'bg-[var(--color-bg)] border border-[var(--color-card-border)] rounded-2xl py-1 pointer-events-auto z-[1001] absolute',
      isBottomNav ? 'w-[calc(100%_-_32px)]' : 'w-[280px]',
      isBottomNav ? 'bottom-full left-4 mb-1.5' : 'left-0 top-full mt-2',
      !isOpen && 'pointer-events-none invisible',
      className,
    )}
    style={{ visibility: isOpen ? 'visible' : 'hidden', ...style }}
    {...props}
  />
)

export const LinkStatus = ({
  color,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { color: string; fontSize?: string }) => (
  <span
    className={cn('rounded-2xl px-2 border-2 shadow-none ml-2 text-sm', className)}
    style={{
      borderColor: `var(--color-${color}, ${color})`,
      color: `var(--color-${color}, ${color})`,
    }}
    {...props}
  />
)

export interface StyledDropdownMenuItemProps extends ComponentPropsWithoutRef<'button'> {
  disabled?: boolean
  isActive?: boolean
}

export const DropdownMenuItem = ({
  isActive = false,
  disabled,
  className,
  ...props
}: StyledDropdownMenuItemProps & { isActive: boolean }) => (
  <button
    className={cn(
      'items-center border-0 bg-transparent cursor-pointer flex text-base h-12 justify-between outline-0 pl-4 pr-4 w-full',
      'hover:not-disabled:bg-[var(--color-tertiary)]',
      'active:not-disabled:opacity-85 active:not-disabled:translate-y-px',
      isActive ? 'text-[var(--color-secondary)] font-semibold' : 'text-theme-text font-normal',
      disabled && 'cursor-not-allowed',
      className,
    )}
    disabled={disabled}
    {...props}
  />
)

export const StyledDropdownMenuItemContainer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('first:[&>button]:rounded-t-lg last:[&>button]:rounded-b-lg', className)} {...props} />
)

const DropdownMenu: FC<DropdownMenuProps> = ({
  children,
  isBottomNav = false,
  showItemsOnMobile = false,
  activeItem = '',
  items = [],
  index,
  setMenuOpenByIndex,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const hasItems = items.length > 0

  const isMenuShow = isOpen && ((isBottomNav && showItemsOnMobile) || !isBottomNav)

  useEffect(() => {
    if (isBottomNav) {
      return
    }

    const container = containerRef.current

    if (!container) {
      return
    }

    const showDropdownMenu = () => setIsOpen(true)
    const hideDropdownMenu = () => setIsOpen(false)

    container.addEventListener('mouseenter', showDropdownMenu)
    container.addEventListener('mouseleave', hideDropdownMenu)

    return () => {
      container.removeEventListener('mouseenter', showDropdownMenu)
      container.removeEventListener('mouseleave', hideDropdownMenu)
    }
  }, [isBottomNav])

  useEffect(() => {
    if (setMenuOpenByIndex && index !== undefined) {
      setMenuOpenByIndex((prevValue) => ({ ...prevValue, [index]: isMenuShow }))
    }
  }, [isMenuShow, setMenuOpenByIndex, index])

  useOnClickOutside(containerRef, () => {
    setIsOpen(false)
  })

  return (
    <div ref={containerRef} className="relative" {...props}>
      <div
        onPointerDown={() => {
          if (hasItems) {
            setIsOpen((s) => !s)
          }
        }}
      >
        {children}
      </div>
      {hasItems && (
        <StyledDropdownMenu isBottomNav={isBottomNav} isOpen={isMenuShow}>
          {items
            .filter((item) => !item.isMobileOnly)
            .map(({ label, href = '/', status, type: itemType, ...itemProps }) => {
              const MenuItemContent = (
                <>
                  {label}
                  {status && (
                    <LinkStatus color={status.color} fontSize="14px">
                      {status.text}
                    </LinkStatus>
                  )}
                </>
              )
              const isActive = href === activeItem
              return (
                <StyledDropdownMenuItemContainer key={`${label}-${href}`}>
                  <DropdownMenuItem
                    isActive={isActive}
                    type="button"
                    data-item-type={itemType ?? DROPDOWN_MENU_ITEM_TYPE.INTERNAL_LINK}
                    {...itemProps}
                  >
                    <Link href={href}>{MenuItemContent}</Link>
                  </DropdownMenuItem>
                </StyledDropdownMenuItemContainer>
              )
            })}
        </StyledDropdownMenu>
      )}
    </div>
  )
}

export default DropdownMenu
