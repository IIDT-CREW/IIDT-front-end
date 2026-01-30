import React, { useEffect } from 'react'
import { cn } from '@lib/utils'
import { ModalBody, ModalHeader, ModalTitle, ModalContainer, ModalCloseButton, ModalBackButton } from './styles'
import { ModalProps } from './types'

const Modal: React.FC<ModalProps> = ({
  title = '',
  onDismiss,
  onBack,
  children,
  hideTitle = false,
  hideCloseButton = false,
  bodyPadding = '32px',
  headerBackground = 'transparent',
  minWidth = '272px',
  className,
  ...props
}) => {
  useEffect(() => {
    const preventGoBack = () => {
      onDismiss?.()
    }
    window.addEventListener('popstate', preventGoBack)
    return () => window.removeEventListener('popstate', preventGoBack)
  }, [onDismiss])

  return (
    <ModalContainer minWidth={minWidth} className={className} {...props}>
      {!hideTitle && (
        <ModalHeader background={headerBackground}>
          <ModalTitle>
            {onBack && <ModalBackButton onBack={onBack} />}
            <h2 className="text-lg font-semibold leading-tight">{title}</h2>
          </ModalTitle>
          {!hideCloseButton && <ModalCloseButton onDismiss={onDismiss} />}
        </ModalHeader>
      )}
      <ModalBody p={bodyPadding}>{children}</ModalBody>
    </ModalContainer>
  )
}

export default Modal
