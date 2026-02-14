import React, { cloneElement, Children, ReactElement } from 'react'
import cn from 'utils/cn'
import { TabMenuProps } from './types'

const ButtonMenu: React.FC<TabMenuProps> = ({ activeIndex = 0, onItemClick, children }) => {
  return (
    <div className="flex border-b border-theme-input overflow-x-scroll scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1 sm:px-4">
      <div className="flex justify-between grow md:grow-0 [&>button+button]:ml-1">
        {Children.map(children, (child: ReactElement, index) => {
          const isActive = activeIndex === index
          return cloneElement(child, {
            isActive,
            onClick: onItemClick ? () => onItemClick(index) : undefined,
            color: isActive ? 'var(--color-bg-alt)' : 'var(--color-text-subtle)',
            backgroundColor: isActive ? 'var(--color-text-subtle)' : 'var(--color-input)',
          })
        })}
      </div>
    </div>
  )
}

export default ButtonMenu
