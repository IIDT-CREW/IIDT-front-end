import { useState, useRef, useCallback } from 'react'
import { cn } from 'utils/cn'
import iconMap from './iconMap'

const Collapse = ({ title, children, noIcon }: any) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true)
  const parentRef = useRef<HTMLDivElement>(null)
  const childRef = useRef<HTMLDivElement>(null)
  const handleButtonClick = useCallback((event) => {
    event.stopPropagation()
    if (parentRef.current === null || childRef.current === null) {
      return
    }
    if (parentRef.current.clientHeight > 0) {
      parentRef.current.style.height = '0'
    } else {
      parentRef.current.style.height = `${childRef.current.clientHeight}px`
    }
    setIsSubMenuOpen((prev) => !prev)
  }, [])

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center">
        <div className="flex py-[5px]">
          {!noIcon && <div className="flex justify-center items-center px-[5px]">{iconMap?.AlignLeftOutlined}</div>}
          <p className="text-base font-semibold leading-relaxed">{title}</p>
        </div>

        <i
          onClick={handleButtonClick}
          className={cn(
            'cursor-pointer transition-all duration-[350ms] ease-[ease]',
            isSubMenuOpen ? '!-rotate-180' : '!rotate-0',
          )}
        >
          {iconMap?.UpOutlined}
        </i>
      </div>

      <div
        ref={parentRef}
        className="h-0 w-[inherit] px-2 overflow-hidden transition-[height,background] duration-[350ms] ease-[ease]"
      >
        <div ref={childRef}>{children}</div>
      </div>
    </div>
  )
}

export default Collapse
