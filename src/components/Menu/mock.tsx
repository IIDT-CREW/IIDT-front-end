import noop from 'lodash/noop'
import { DROPDOWN_MENU_ITEM_TYPE, type DropdownMenuItems } from './types'

const ItemsMock: DropdownMenuItems[] = [
  {
    label: 'Exchange',
    href: '/swap',
  },
  {
    label: 'Liquidity',
    href: '/pool',
  },
  {
    label: 'LP Migration',
    href: '',
    type: DROPDOWN_MENU_ITEM_TYPE.EXTERNAL_LINK,
  },
  {
    type: DROPDOWN_MENU_ITEM_TYPE.DIVIDER,
  },
  {
    label: 'Disconnect',
    onClick: noop,
    type: DROPDOWN_MENU_ITEM_TYPE.BUTTON,
  },
]

const MenuItemsMock = [
  {
    label: 'Home',
    href: '/',
    items: ItemsMock,
  },
  {
    label: 'mypage',
    href: '/',
    items: ItemsMock,
  },
]

export default MenuItemsMock
