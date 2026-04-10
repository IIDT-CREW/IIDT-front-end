import { CSSProperties, forwardRef, HTMLAttributes } from 'react'
import { cn } from 'utils/cn'

type CSSValue = string | number

const SPACE_SCALE = [0, 4, 8, 16, 24, 32, 48, 64]

const COLOR_TOKEN_MAP: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  text: 'var(--color-text)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textSubtle: 'var(--color-text-subtle)',
  textDisabled: 'var(--color-light-text-disabled)',
  subtle: 'var(--color-text-subtle)',
  disabled: 'var(--color-light-text-disabled)',
  error: 'var(--color-error)',
  success: 'var(--color-success)',
  failure: 'var(--color-failure)',
  warning: 'var(--color-warning)',
}

const toSpaceValue = (value?: CSSValue) => {
  if (value === undefined) return undefined
  if (typeof value === 'number') {
    return `${SPACE_SCALE[value] ?? value}px`
  }
  return value
}

const toStyleValue = (value?: CSSValue) => {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const toColorValue = (value?: string) => {
  if (!value) return undefined
  return COLOR_TOKEN_MAP[value] ?? value
}

export interface TwTextProps extends HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
  bold?: boolean
  small?: boolean
  ellipsis?: boolean
  color?: string
  fontSize?: CSSValue
  width?: CSSValue
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  css?: CSSProperties
  m?: CSSValue
  mt?: CSSValue
  mb?: CSSValue
  ml?: CSSValue
  mr?: CSSValue
  p?: CSSValue
  pt?: CSSValue
  pb?: CSSValue
  pl?: CSSValue
  pr?: CSSValue
}

const TwText = forwardRef<HTMLElement, TwTextProps>(
  (
    {
      as: Component = 'div',
      bold,
      small,
      ellipsis,
      color = 'text',
      fontSize,
      width,
      textTransform,
      css,
      className,
      children,
      style,
      m,
      mt,
      mb,
      ml,
      mr,
      p,
      pt,
      pb,
      pl,
      pr,
      ...rest
    },
    ref,
  ) => {
    const textStyle: CSSProperties = {
      color: toColorValue(color),
      fontSize: toStyleValue(fontSize ?? (small ? '14px' : '18px')),
      width: toStyleValue(width),
      textTransform,
      margin: toSpaceValue(m),
      marginTop: toSpaceValue(mt),
      marginBottom: toSpaceValue(mb),
      marginLeft: toSpaceValue(ml),
      marginRight: toSpaceValue(mr),
      padding: toSpaceValue(p),
      paddingTop: toSpaceValue(pt),
      paddingBottom: toSpaceValue(pb),
      paddingLeft: toSpaceValue(pl),
      paddingRight: toSpaceValue(pr),
      ...css,
      ...style,
    }

    // @ts-expect-error dynamic element type
    return (
      <Component
        ref={ref}
        className={cn(
          'leading-[1.5]',
          bold ? 'font-semibold' : 'font-normal',
          ellipsis && 'whitespace-nowrap overflow-hidden text-ellipsis',
          className,
        )}
        style={textStyle}
        {...rest}
      >
        {children}
      </Component>
    )
  },
)

TwText.displayName = 'TwText'

export default TwText
