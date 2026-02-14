import { ElementType, SVGAttributes } from 'react'

export interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {
  spin?: boolean
  themeMode?: 'light' | 'dark'
  css?: React.CSSProperties
}

export type IconComponentType = {
  icon: ElementType<any>
  fillIcon?: ElementType<any>
  isActive?: boolean
  height?: string
  width?: string
  activeColor?: string
  activeBackgroundColor?: string
} & SvgProps
