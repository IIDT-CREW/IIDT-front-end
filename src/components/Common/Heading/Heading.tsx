import { CSSProperties, ElementType, HTMLAttributes } from 'react'
import { cn } from 'utils/cn'
import { scales, HeadingProps } from './types'

const scaleStyles = {
  [scales.MD]: 'text-[18px] xl:text-[18px]',
  [scales.LG]: 'text-[26px] xl:text-[26px]',
  [scales.XL]: 'text-[36px] xl:text-[36px]',
  [scales.XXL]: 'text-[45px] xl:text-[45px]',
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

const Heading = ({
  scale = scales.MD,
  as,
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
}: HeadingProps & HeadingStyleProps & HTMLAttributes<HTMLElement>) => {
  const scaleClassName = scaleStyles[scale] || scaleStyles[scales.MD]
  const Component = (as ?? 'div') as ElementType

  return (
    <Component
      className={cn('leading-[1.1] font-semibold', scaleClassName, className)}
      style={{
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
}

export default Heading
