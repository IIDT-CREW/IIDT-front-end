import { CSSProperties, forwardRef } from 'react'
import cn from 'utils/cn'
import { scales, HeadingProps } from './types'

const scaleStyles = {
  [scales.MD]: { fontSize: '18px', fontSizeLg: '18px' },
  [scales.LG]: { fontSize: '26px', fontSizeLg: '26px' },
  [scales.XL]: { fontSize: '36px', fontSizeLg: '36px' },
  [scales.XXL]: { fontSize: '45px', fontSizeLg: '45px' },
}

type CSSValue = string | number

const SPACE_SCALE = [0, 4, 8, 16, 24, 32, 48, 64]

const toSpaceValue = (value?: CSSValue) => {
  if (value === undefined) return undefined
  if (typeof value === 'number') {
    return `${SPACE_SCALE[value] ?? value}px`
  }
  return value
}

interface HeadingStyleProps {
  m?: CSSValue
  mt?: CSSValue
  mb?: CSSValue
  ml?: CSSValue
  mr?: CSSValue
  textAlign?: CSSProperties['textAlign']
  fontFamily?: CSSProperties['fontFamily']
}

const Heading = forwardRef<HTMLDivElement, HeadingProps & HeadingStyleProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    {
      scale = scales.MD,
      as: Component = 'div',
      color,
      className,
      style,
      m,
      mt,
      mb,
      ml,
      mr,
      textAlign,
      fontFamily,
      ...props
    },
    ref,
  ) => {
    const s = scaleStyles[scale] || scaleStyles[scales.MD]

    return (
      <Component
        ref={ref}
        className={cn('leading-[1.1]', className)}
        style={{
          fontSize: s.fontSize,
          fontWeight: 600,
          color,
          margin: toSpaceValue(m),
          marginTop: toSpaceValue(mt),
          marginBottom: toSpaceValue(mb),
          marginLeft: toSpaceValue(ml),
          marginRight: toSpaceValue(mr),
          textAlign,
          fontFamily,
          ...style,
        }}
        {...props}
      />
    )
  },
)

Heading.displayName = 'Heading'

export default Heading
