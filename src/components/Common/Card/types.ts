import { HTMLAttributes } from 'react'

export type CardTheme = {
  background: string
  boxShadow: string
  boxShadowActive: string
  boxShadowSuccess: string
  boxShadowWarning: string
  cardHeaderBackground: {
    default: string
    blue: string
    bubblegum: string
    violet: string
  }
  dropShadow: string
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  isSuccess?: boolean
  isWarning?: boolean
  isDisabled?: boolean
  ribbon?: React.ReactNode
  borderBackground?: string
  background?: string
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
