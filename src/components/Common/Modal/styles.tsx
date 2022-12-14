import React from 'react'
import styled from 'styled-components'
import Flex from '../Box/Flex'
import { Box } from '../Box'
import { ArrowBackIcon, CloseIcon } from '../Svg'
import IconButton from '../Button/IconButton'
import { ModalProps } from './types'

export const ModalHeader = styled.div<{ background?: string }>`
  position: relative;
  align-items: center;
  justify-content: center;
  background: ${({ background }) => background || 'transparent'};
  display: flex;
  padding: 32px 24px 14px 32px;
`

export const ModalTitle = styled(Flex)`
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'] }> = ({ onDismiss }) => {
  return (
    <Box position="absolute" right="0" top="24px">
      <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  )
}

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.modal.background};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: 8px;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
    margin: 0 10px;
  }
`
