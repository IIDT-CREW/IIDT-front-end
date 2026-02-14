import { ReactElement } from 'react'

export const scales = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

export type Scales = typeof scales[keyof typeof scales]

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  scale?: Scales
  isSuccess?: boolean
  isWarning?: boolean
  form?: any
  m?: string
  mt?: string
  mb?: string
  ml?: string
  mr?: string
  p?: string
  pt?: string
  pb?: string
  pl?: string
  pr?: string
}

export interface InputGroupProps {
  scale?: Scales
  startIcon?: ReactElement
  endIcon?: ReactElement
  children: JSX.Element
  m?: string
  mt?: string
  mb?: string
  ml?: string
  mr?: string
  p?: string
  pt?: string
  pb?: string
  pl?: string
  pr?: string
}
