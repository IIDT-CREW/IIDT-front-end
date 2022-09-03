import { Modal, ModalProps } from 'components/Common'
import { Flex, Box, Text } from 'components/Common'
import styled from 'styled-components'
import { ButtonHTMLAttributes, MouseEventHandler } from 'react'

interface customModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onDismiss?: () => void
}

const SelectPostTypeModal = ({ onClick, onDismiss }: customModalProps) => {
  return (
    <Modal title="일기 작성 방식을 선택할 수 있어요" onDismiss={onDismiss}>
      <Flex flexDirection="column" justifyContent="center" alignItems="center">
        <Box mb="20px">
          <Flex justifyContent="center" flexDirection="column" style={{ textAlign: 'center' }}>
            <Text> 마지막 일기를 처음 작성하시는 분들을 위해 두 가지의 선택방식을 두었어요.</Text>
            <Text>편하신 방법을 선택하여, 당신의 마지막 일기를 작성해주세요.</Text>
          </Flex>
        </Box>

        <Box mt="20px">
          <Flex flexDirection="column">
            <St.ModalButton onClick={onClick}>질문에 따라 유서를 적고 싶어요</St.ModalButton>
            <St.ModalButton onClick={onDismiss} variant="primary">
              제 마음대로 일기를 적고 싶어요
            </St.ModalButton>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default SelectPostTypeModal

type variant = 'primary' | 'secondary'
const St = {
  ModalButton: styled.button<{ variant?: variant }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 14px 16px;
    gap: 10px;

    width: 335px;
    height: 50px;
    margin: 16px 20px;

    ${({ variant, theme }) => {
      if (variant === 'primary') {
        return `
        background-color: ${theme.colors.grayscale7};
        color: ${theme.colors.grayscale0};
        `
      }
      return `
        background-color: ${theme.colors.grayscale2};
        color: ${theme.colors.grayscale7};
      `
    }}
    cursor: pointer;
    border-radius: 4px;
    border: none;

    font-family: 'SUIT';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  `,
}
