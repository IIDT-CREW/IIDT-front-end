import { forwardRef } from 'react'
import cn from 'utils/cn'
import { scales, HeadingProps } from './types'

const scaleStyles = {
  [scales.MD]: { fontSize: '18px', fontSizeLg: '18px' },
  [scales.LG]: { fontSize: '26px', fontSizeLg: '26px' },
  [scales.XL]: { fontSize: '36px', fontSizeLg: '36px' },
  [scales.XXL]: { fontSize: '45px', fontSizeLg: '45px' },
}

const Heading = forwardRef<
  HTMLDivElement,
  HeadingProps & React.HTMLAttributes<HTMLDivElement>
>(({ scale = scales.MD, as: _as, className, style, ...props }, ref) => {
  const s = scaleStyles[scale] || scaleStyles[scales.MD]

  return (
    <div
      ref={ref}
      className={cn('leading-[1.1]', className)}
      style={{
        fontSize: s.fontSize,
        fontWeight: 600,
        ...style,
      }}
      {...props}
    />
  )
})

Heading.displayName = 'Heading'

export default Heading
