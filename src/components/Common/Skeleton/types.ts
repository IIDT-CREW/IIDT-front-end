export const animation = {
  WAVES: 'waves',
  PULSE: 'pulse',
} as const

export const variant = {
  RECT: 'rect',
  CIRCLE: 'circle',
} as const

export type Animation = typeof animation[keyof typeof animation]
export type Variant = typeof variant[keyof typeof variant]

export interface SkeletonProps {
  animation?: Animation
  variant?: Variant
  width?: string | number
  height?: string | number
  className?: string
}

export interface SkeletonV2Props {
  animation?: Animation
  variant?: Variant
  isDataReady?: boolean
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>
  skeletonTop?: string
  skeletonLeft?: string
  children?: any
  width?: string | number
  height?: string | number
  mr?: string | number
  ml?: string | number
  mb?: string | number
}
