import { HTMLAttributes, ImgHTMLAttributes } from 'react'

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  isFill?: boolean
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  isUseBlur?: boolean
  width?: number | string
  height?: number | string
  isFill?: boolean
  objectFit?: React.CSSProperties['objectFit']
  position?: 'absolute' | 'fixed'
}
