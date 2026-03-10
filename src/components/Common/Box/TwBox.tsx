import { CSSProperties, forwardRef, HTMLAttributes } from 'react'
import cn from 'utils/cn'

type CSSValue = string | number

const SPACE_SCALE = [0, 4, 8, 16, 24, 32, 48, 64]

const COLOR_TOKEN_MAP: Record<string, string> = {
  background: 'var(--color-bg)',
  backgroundAlt: 'var(--color-bg-alt)',
  backgroundDisabled: 'var(--color-light-bg-disabled)',
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  failure: 'var(--color-failure)',
  tertiary: 'var(--color-tertiary)',
  text: 'var(--color-text)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textSubtle: 'var(--color-text-subtle)',
  textDisabled: 'var(--color-light-text-disabled)',
  cardBorder: 'var(--color-card-border)',
  input: 'var(--color-surface-input)',
  inputSecondary: 'var(--color-light-input-secondary)',
  grayscale0: 'var(--color-grayscale-0)',
  grayscale1: 'var(--color-grayscale-1)',
  grayscale2: 'var(--color-grayscale-2)',
  grayscale3: 'var(--color-grayscale-3)',
  grayscale4: 'var(--color-grayscale-4)',
  grayscale5: 'var(--color-grayscale-5)',
  grayscale6: 'var(--color-grayscale-6)',
  grayscale7: 'var(--color-grayscale-7)',
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

export interface TwBoxProps extends HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements
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
  width?: CSSValue
  height?: CSSValue
  minWidth?: CSSValue
  maxWidth?: CSSValue
  minHeight?: CSSValue
  maxHeight?: CSSValue
  display?: CSSProperties['display']
  position?: CSSProperties['position']
  top?: CSSValue
  right?: CSSValue
  bottom?: CSSValue
  left?: CSSValue
  background?: string
  bg?: string
  border?: CSSProperties['border']
  borderTop?: CSSProperties['borderTop']
  borderRight?: CSSProperties['borderRight']
  borderBottom?: CSSProperties['borderBottom']
  borderLeft?: CSSProperties['borderLeft']
  borderRadius?: CSSValue
  justifyContent?: CSSProperties['justifyContent']
  alignItems?: CSSProperties['alignItems']
  alignContent?: CSSProperties['alignContent']
  flexDirection?: CSSProperties['flexDirection']
  flexWrap?: CSSProperties['flexWrap']
  flex?: CSSProperties['flex']
  order?: CSSProperties['order']
  gap?: CSSValue
  rowGap?: CSSValue
  columnGap?: CSSValue
}

const getBoxStyle = ({
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
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  display,
  position,
  top,
  right,
  bottom,
  left,
  background,
  bg,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderRadius,
  justifyContent,
  alignItems,
  alignContent,
  flexDirection,
  flexWrap,
  flex,
  order,
  gap,
  rowGap,
  columnGap,
}: TwBoxProps): CSSProperties => ({
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
  width: toStyleValue(width),
  height: toStyleValue(height),
  minWidth: toStyleValue(minWidth),
  maxWidth: toStyleValue(maxWidth),
  minHeight: toStyleValue(minHeight),
  maxHeight: toStyleValue(maxHeight),
  display,
  position,
  top: toStyleValue(top),
  right: toStyleValue(right),
  bottom: toStyleValue(bottom),
  left: toStyleValue(left),
  background: toColorValue(background ?? bg),
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderRadius: toStyleValue(borderRadius),
  justifyContent,
  alignItems,
  alignContent,
  flexDirection,
  flexWrap,
  flex,
  order,
  gap: toStyleValue(gap),
  rowGap: toStyleValue(rowGap),
  columnGap: toStyleValue(columnGap),
})

const TwBox = forwardRef<HTMLDivElement, TwBoxProps>(
  (
    {
      as: Component = 'div',
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
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      display,
      position,
      top,
      right,
      bottom,
      left,
      background,
      bg,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderRadius,
      justifyContent,
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      flex,
      order,
      gap,
      rowGap,
      columnGap,
      ...rest
    },
    ref,
  ) => {
    const boxStyle = getBoxStyle({
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
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      display,
      position,
      top,
      right,
      bottom,
      left,
      background,
      bg,
      border,
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderRadius,
      justifyContent,
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      flex,
      order,
      gap,
      rowGap,
      columnGap,
    })

    // @ts-expect-error dynamic element type
    return (
      <Component ref={ref} className={cn(className)} style={{ ...boxStyle, ...style }} {...rest}>
        {children}
      </Component>
    )
  },
)

TwBox.displayName = 'TwBox'

export default TwBox

export const TwFlex = forwardRef<HTMLDivElement, TwBoxProps>(({ className, display, ...rest }, ref) => (
  <TwBox ref={ref} className={cn('flex', className)} display={display ?? 'flex'} {...rest} />
))

TwFlex.displayName = 'TwFlex'

export const TwGrid = forwardRef<HTMLDivElement, TwBoxProps>(({ className, display, ...rest }, ref) => (
  <TwBox ref={ref} className={cn('grid', className)} display={display ?? 'grid'} {...rest} />
))

TwGrid.displayName = 'TwGrid'
