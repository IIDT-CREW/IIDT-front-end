/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { Box } from '../Common/Box'
import Text from '../Common/Text/Text'
import { DropdownMenuItemType, DropdownMenuProps } from './types'
import Link from 'next/link'
import cn from 'utils/cn'

export const StyledDropdownMenu = ({
  isOpen,
  isBottomNav,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { isOpen: boolean; isBottomNav: boolean }) => (
  <div
    className={cn(
      'bg-[var(--color-bg)] border border-[var(--color-card-border)] rounded-2xl py-1 pointer-events-auto z-[1001]',
      isBottomNav ? 'w-[calc(100%-32px)]' : 'w-[280px]',
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
}: React.HTMLAttributes<HTMLSpanElement> & { color: string; fontSize?: string }) => (
  <span
    className={cn('rounded-2xl px-2 border-2 shadow-none ml-2 text-sm', className)}
    style={{
      borderColor: `var(--color-${color}, ${color})`,
      color: `var(--color-${color}, ${color})`,
    }}
    {...props}
  />
)

export interface StyledDropdownMenuItemProps extends React.ComponentPropsWithoutRef<'button'> {
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

export const StyledDropdownMenuItemContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'first:[&>button]:rounded-t-lg last:[&>button]:rounded-b-lg',
      className,
    )}
    {...props}
  />
)

const DropdownMenu: React.FC<DropdownMenuProps> = ({
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
  const [targetRef, setTargetRef] = useState<HTMLDivElement | null>(null)
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null)
  const hasItems = items.length > 0
  const { styles, attributes } = usePopper(targetRef, tooltipRef, {
    strategy: isBottomNav ? 'absolute' : 'fixed',
    placement: isBottomNav ? 'top' : 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, isBottomNav ? 6 : 0] } }],
  })

  const isMenuShow = isOpen && ((isBottomNav && showItemsOnMobile) || !isBottomNav)

  useEffect(() => {
    const showDropdownMenu = () => {
      setIsOpen(true)
    }

    const hideDropdownMenu = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as Node
      return target && !tooltipRef?.contains(target) && setIsOpen(false)
    }

    targetRef?.addEventListener('mouseenter', showDropdownMenu)
    targetRef?.addEventListener('mouseleave', hideDropdownMenu)

    return () => {
      targetRef?.removeEventListener('mouseenter', showDropdownMenu)
      targetRef?.removeEventListener('mouseleave', hideDropdownMenu)
    }
  }, [targetRef, tooltipRef, setIsOpen, isBottomNav])

  useEffect(() => {
    if (setMenuOpenByIndex && index !== undefined) {
      setMenuOpenByIndex((prevValue) => ({ ...prevValue, [index]: isMenuShow }))
    }
  }, [isMenuShow, setMenuOpenByIndex, index])

  useOnClickOutside(
    {
      current: targetRef,
    },
    () => {
      setIsOpen(false)
    },
  )

  return (
    <Box ref={setTargetRef} {...props}>
      <Box
        onPointerDown={() => {
          setIsOpen((s) => !s)
        }}
      >
        {children}
      </Box>
      {hasItems && (
        <StyledDropdownMenu
          style={styles.popper}
          ref={setTooltipRef}
          {...attributes.popper}
          isBottomNav={isBottomNav}
          isOpen={isMenuShow}
        >
          {items
            .filter((item) => !item.isMobileOnly)
            .map(({ type = DropdownMenuItemType.INTERNAL_LINK, label, href = '/', status, ...itemProps }, itemItem) => {
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
                <StyledDropdownMenuItemContainer key={itemItem}>
                  <DropdownMenuItem isActive={isActive} type="button" {...itemProps}>
                    <Link href={href}>{MenuItemContent}</Link>
                  </DropdownMenuItem>
                </StyledDropdownMenuItemContainer>
              )
            })}
        </StyledDropdownMenu>
      )}
    </Box>
  )
}

export default DropdownMenu
