import type { ComponentPropsWithoutRef, Dispatch, HTMLAttributes, ReactNode, SetStateAction } from 'react'

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  items?: DropdownMenuItems[]
  activeItem?: string
  /**
   * As BottomNav styles
   */
  isBottomNav?: boolean
  /**
   * Show items on mobile when `isBottomNav` is true
   */
  showItemsOnMobile?: boolean
  index?: number
  setMenuOpenByIndex?: Dispatch<SetStateAction<Record<number, boolean>>>
}

export interface StyledDropdownMenuItemProps extends ComponentPropsWithoutRef<'button'> {
  disabled?: boolean
  isActive?: boolean
}

export const DROPDOWN_MENU_ITEM_TYPE = {
  INTERNAL_LINK: 'internal-link',
  EXTERNAL_LINK: 'external-link',
  BUTTON: 'button',
  DIVIDER: 'divider',
} as const

export type DropdownMenuItemValue = typeof DROPDOWN_MENU_ITEM_TYPE[keyof typeof DROPDOWN_MENU_ITEM_TYPE]

export interface LinkStatus {
  text: string
  color: string
}

export interface DropdownMenuItems {
  label?: string | ReactNode
  href?: string
  onClick?: () => void
  type?: DropdownMenuItemValue
  status?: LinkStatus
  disabled?: boolean
  iconName?: string
  isMobileOnly?: boolean
}
