import React from 'react'
import { Will } from '@api/will/types'
import { Text, Flex } from 'components/Common'

type WillCardProps = {
  will?: Will
}

const Footer = ({ will }: WillCardProps) => {
  const { MEM_NICKNAME: memNickname } = will

  return (
    <Flex mt="18px" justifyContent="end">
      <Text color="grayscale5">{memNickname ? memNickname : '익명'} 마침.</Text>
    </Flex>
  )
}

export default React.memo(Footer)
