import React, { useState } from 'react'
import { LinkOutlined } from '@ant-design/icons'
import cn from 'utils/cn'

interface Props {
  toCopy: string
}

const CopyToClipboard: React.FC<Props> = ({ toCopy, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  const copyToClipboardWithCommand = (content: string) => {
    const el = document.createElement('textarea')
    el.value = content
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  function displayTooltip() {
    setIsTooltipDisplayed(true)
    setTimeout(() => {
      setIsTooltipDisplayed(false)
    }, 1000)
  }

  return (
    <div
      role="button"
      className="relative flex items-center cursor-pointer text-[var(--color-primary)]"
      onClick={() => {
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard.writeText(toCopy).then(() => displayTooltip())
        } else if (document.queryCommandSupported('copy')) {
          copyToClipboardWithCommand(toCopy)
          displayTooltip()
        }
      }}
      {...props}
    >
      <LinkOutlined className="w-10 h-10 text-[32px] text-black" />
      <div
        className={cn(
          'absolute bottom-[-22px] right-0 left-0 text-center w-20 rounded transition-all duration-600',
          'bg-[var(--color-contrast)] text-[var(--color-inverted-contrast)]',
          'shadow-[0px_20px_36px_-8px_rgb(14_14_44/10%),0px_1px_1px_rgb(0_0_0/5%)]',
        )}
        style={{
          opacity: isTooltipDisplayed ? 0.7 : 0,
        }}
      >
        복사 완료.
      </div>
    </div>
  )
}

export default CopyToClipboard
