import { HTMLAttributes } from 'react'

export interface TextProps extends HTMLAttributes<HTMLDivElement> {
  color?: string
  bold?: boolean
  small?: boolean
  ellipsis?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  css?: React.CSSProperties
  // styled-system compat
  fontSize?: string | string[]
  fontWeight?: string | number
  fontFamily?: string
  lineHeight?: string | number
  letterSpacing?: string
  textAlign?: string
  display?: string
  width?: string | number
  height?: string | number
  // space
  m?: string | number
  mt?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  p?: string | number
  pt?: string | number
  pb?: string | number
  pl?: string | number
  pr?: string | number
  padding?: string | number
}
