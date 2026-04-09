import React from 'react'
import { Will } from '@api/will/types'

type WillCardProps = {
  will?: Will
}

const Footer = ({ will }: WillCardProps) => {
  if (!will) return null

  const { MEM_NICKNAME: memNickname } = will

  return (
    <div className="mt-[18px] flex justify-end">
      <p className="text-[var(--color-grayscale-5)]">{memNickname ? memNickname : '익명'} 마침.</p>
    </div>
  )
}

export default React.memo(Footer)
