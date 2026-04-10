import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Will } from '@api/will/types'
import { ChevronUp, Ellipsis } from 'lucide-react'
import { Card } from 'components/ui/card'
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
  const ref = useRef<HTMLDivElement | null>(null)
  const [isOverflow, setIsOverflow] = useState(false)
  const isOverflowContent = useRef(false)
  const expandedHeight = ref.current ? `${ref.current.clientHeight + MARGIN_BOTTOM}px` : `${MAX_CARD_HEIGHT}px`

  useEffect(() => {
    if (ref.current && ref.current.clientHeight + MARGIN_BOTTOM > MAX_CARD_HEIGHT) {
      setIsOverflow(true)
      isOverflowContent.current = true
    }
  }, [will])

  const handleIsOpen = useCallback(() => {
    setIsOverflow((prev) => !prev)
  }, [])

  return (
    <div className="relative">
      <Card
        style={{
          maxHeight: isOverflow ? `${MAX_CARD_HEIGHT}px` : expandedHeight,
          overflow: isOverflow ? 'hidden' : 'auto',
        }}
        className="mx-6 mb-10 min-w-[362px] max-w-[582px] gap-0 rounded-[4px] px-5 py-5 shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)] transition-all duration-1000"
      >
        <div ref={ref}>
          <Header will={will} handleDelete={handleDelete} handleShare={handleShare} isPrivate={isPrivate} />
          <Body will={will} />
          <Footer will={will} />
        </div>
      </Card>

      {isOverflowContent?.current && isOverflow && (
        <button
          type="button"
          className="absolute bottom-[-15px] left-[45%] rounded-full bg-[var(--color-bg)] shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)]"
          onClick={handleIsOpen}
        >
          <Ellipsis className="h-10 w-10 cursor-pointer p-1.5" />
        </button>
      )}
      {isOverflowContent?.current && !isOverflow && (
        <button
          type="button"
          className="absolute bottom-[-15px] left-[45%] flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg)] shadow-[0px_0px_1px_rgba(0,0,0,0.15),0px_2px_6px_rgba(0,0,0,0.13)]"
          onClick={handleIsOpen}
        >
          <ChevronUp className="h-8 w-8 cursor-pointer" />
        </button>
      )}
    </div>
  )
}

export default memo(WillCard)
