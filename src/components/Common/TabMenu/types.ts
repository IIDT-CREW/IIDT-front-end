export interface TabMenuProps {
  activeIndex?: number
  onItemClick?: (index: number) => void
  children: React.ReactElement[]
}
export interface TabProps {
  isActive?: boolean
  onClick?: () => void
  scale?: 'md' | 'lg'
  color?: string
  backgroundColor?: string
  className?: string
}
