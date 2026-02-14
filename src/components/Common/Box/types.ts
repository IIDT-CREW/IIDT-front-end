import { HTMLAttributes } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  // Space
  m?: string | number
  mt?: string | number
  mb?: string | number
  ml?: string | number
  mr?: string | number
  mx?: string | number
  my?: string | number
  p?: string | number
  pt?: string | number
  pb?: string | number
  pl?: string | number
  pr?: string | number
  px?: string | number
  py?: string | number
  padding?: string | number
  paddingTop?: string | number
  margin?: string | number
  marginTop?: string | number
  marginBottom?: string | number
  // Layout
  width?: string | number
  height?: string | number
  minWidth?: string | number
  maxWidth?: string | number
  minHeight?: string | number
  maxHeight?: string | number
  display?: string
  overflow?: string
  // Position
  position?: string
  top?: string | number
  right?: string | number
  bottom?: string | number
  left?: string | number
  zIndex?: number
  // Background
  background?: string
  backgroundColor?: string
  bg?: string
  // Border
  border?: string
  borderTop?: string
  borderRight?: string
  borderBottom?: string
  borderLeft?: string
  borderColor?: string
  borderRadius?: string | number
  borderWidth?: string | number
}

export interface FlexProps extends BoxProps {
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  flexWrap?: string
  flex?: string | number
  alignContent?: string
  flexGrow?: number
  flexShrink?: number
  flexBasis?: string | number
  order?: number
  alignSelf?: string
}

export interface GridProps extends FlexProps {
  gridGap?: string | number
  gridRowGap?: string | number
  gridColumnGap?: string | number
  gridColumn?: string
  gridRow?: string
  gridAutoFlow?: string
  gridAutoColumns?: string
  gridAutoRows?: string
  gridTemplateColumns?: string
  gridTemplateRows?: string
  gridTemplateAreas?: string
  gridArea?: string
}
