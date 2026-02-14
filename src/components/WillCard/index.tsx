import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box } from 'components/Common'
import { Will } from '@api/will/types'
import { MoreOutlined, CaretUpOutlined } from '@ant-design/icons'
import Header from './WillCardHeader'
import Body from './WillCardBody'
import Footer from './WillCardFooter'
import { MAX_CARD_HEIGHT } from 'config/constants/default'

const MARGIN_BOTTOM = 40

type WillCardProps = {
  will?: Will
  handleDelete?: () => void
  handleShare?: () => void
  isPrivate?: boolean
}

const WillCard = ({ will, handleDelete, handleShare, isPrivate = true }: WillCardProps) => {
  const ref = useRef(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const isOverflowContent = useRef(false)

  useEffect(() => {
    if (ref.current.clientHeight + MARGIN_BOTTOM > MAX_CARD_HEIGHT) {
      setIsOverflow(true)
      isOverflowContent.current = true
    }
  }, [will])

  const handleIsOpen = useCallback(() => {
    setIsOverflow((prev) => !prev)
  }, [])

  console.log(will, ref?.current?.clientHeight)
  return (
    <Box position="relative">
      <Box
        className="shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)] transition-all duration-1000"
        mr="24px"
        ml="24px"
        mb={`${MARGIN_BOTTOM}px`}
        padding="20px"
        minWidth="362px"
        maxWidth="582px"
        borderRadius="4px"
        maxHeight={isOverflow ? `${MAX_CARD_HEIGHT}px` : `${ref?.current?.clientHeight + MARGIN_BOTTOM}px`}
        overflow={isOverflow ? 'hidden' : 'auto'}
      >
        <Box ref={ref}>
          <Header will={will} handleDelete={handleDelete} handleShare={handleShare} isPrivate={isPrivate} />
          <Body will={will} />
          <Footer will={will} />
        </Box>
      </Box>

      {isOverflowContent?.current && isOverflow && (
        <Box
          className="bg-[var(--color-bg)] shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)] rounded-full"
          position="absolute"
          bottom="-15px"
          left="45%"
          onClick={handleIsOpen}
        >
          <MoreOutlined style={{ fontSize: '40px', cursor: 'pointer' }} />
        </Box>
      )}
      {isOverflowContent?.current && !isOverflow && (
        <Box
          className="bg-[var(--color-bg)] shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)] rounded-full w-10 h-10 flex justify-center items-center"
          position="absolute"
          bottom="-15px"
          left="45%"
          onClick={handleIsOpen}
        >
          <CaretUpOutlined style={{ fontSize: '30px', cursor: 'pointer' }} />
        </Box>
      )}
    </Box>
  )
}

export default React.memo(WillCard)
