import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from 'utils/cn'

interface PageSectionProps extends HTMLAttributes<HTMLDivElement> {
  index?: number
  background?: string
  svgFill?: string
  dividerComponent?: ReactNode
  containerProps?: HTMLAttributes<HTMLDivElement>
  innerProps?: HTMLAttributes<HTMLDivElement>
}

const PageSection: React.FC<PageSectionProps> = ({
  children,
  background,
  index = 1,
  containerProps,
  innerProps,
  ...props
}) => {
  return (
    <div {...containerProps}>
      <div
        className="relative flex-col items-center"
        style={{
          zIndex: index - 1,
          background: background || 'var(--color-bg)',
          padding: '48px 0',
        }}
        {...props}
      >
        <div className={cn('min-h-[auto] py-4 sm:py-8 lg:py-12')} {...innerProps}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default PageSection
