import { HTMLAttributes, ImgHTMLAttributes } from 'react'

export interface WrapperProps extends HTMLAttributes<HTMLDivElement> {
  width: number
  height: number
  isFill?: boolean
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  isUseBlur?: boolean
  width?: number
  height?: number
  isFill?: boolean
  objectFit?: string
  position: 'absolute' | 'fixed'
}
