import React from 'react'
import { ArrowLeft, ArrowRight } from 'components/Common/Svg'
import { PREV } from 'views/Write/data'
import { StyleMenuButton } from '@views/Write/components/MenuBar'
type Variant = 'primary' | 'secondary'

type MenuButtonProps = {
  isMobile: boolean
  text: string
  isDisabled: boolean
  handleMenuButton: (e: any) => void
  variant?: Variant
  buttonType: 'prev' | 'next' | 'done'
}

const MenuButton = ({
  handleMenuButton,
  isMobile,
  text,
  isDisabled,
  variant = 'primary',
  buttonType,
}: MenuButtonProps) => {
  if (isMobile) {
    return (
      <button
        onClick={() => handleMenuButton(buttonType)}
        className="w-6 h-6 rounded-full border border-grayscale-2 bg-grayscale-0 p-0 box-border"
      >
        {buttonType === PREV ? (
          <ArrowLeft style={{ fill: '#000', width: '21px' }} />
        ) : (
          <ArrowRight style={{ fill: '#000', width: '21px' }} />
        )}
      </button>
    )
  }
  return (
    <StyleMenuButton
      id={buttonType}
      variant={variant}
      onClick={() => handleMenuButton(buttonType)}
      disabled={isDisabled}
    >
      {text}
    </StyleMenuButton>
  )
}

export default MenuButton
