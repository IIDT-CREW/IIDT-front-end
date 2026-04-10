import { forwardRef, type FC, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '@lib/utils'
import { XIcon, ArrowLeftIcon } from 'lucide-react'
import { Button } from 'components/ui/button'
import { ModalProps } from './types'

const BACKGROUND_TOKEN_MAP: Record<string, string> = {
  primary: 'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
  background: 'var(--color-bg)',
}

const resolveBackground = (background?: string) => {
  if (!background) return 'transparent'
  return BACKGROUND_TOKEN_MAP[background] ?? background
}

interface ModalHeaderProps {
  background?: string
  className?: string
  children?: ReactNode
}

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ background, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex items-center justify-center px-6 pt-8 pb-3.5 pl-8', className)}
      style={{ background: resolveBackground(background) }}
      {...props}
    >
      {children}
    </div>
  ),
)
ModalHeader.displayName = 'ModalHeader'

export const ModalTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-1 items-center justify-center', className)} {...props} />
))
ModalTitle.displayName = 'ModalTitle'

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  p?: string
}

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(({ className, p, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col max-h-[90vh] overflow-y-auto', className)}
    style={{ padding: p || '32px', ...style }}
    {...props}
  />
))
ModalBody.displayName = 'ModalBody'

export const ModalCloseButton: FC<{ onDismiss: ModalProps['onDismiss'] }> = ({ onDismiss }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={onDismiss}
      className="absolute right-4 top-6"
      aria-label="Close the dialog"
    >
      <XIcon className="w-5 h-5 text-foreground" />
    </Button>
  )
}

export const ModalBackButton: FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onBack} className="mr-2" aria-label="Go back">
      <ArrowLeftIcon className="w-5 h-5 text-[var(--color-primary)]" />
    </Button>
  )
}

interface ModalContainerProps extends HTMLAttributes<HTMLDivElement> {
  minWidth?: string
}

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  ({ className, minWidth = '272px', style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden bg-background border border-card-border rounded-lg w-full max-h-screen z-modal',
        'shadow-[0px_20px_36px_-8px_rgba(14,14,44,0.1),0px_1px_1px_rgba(0,0,0,0.05)]',
        'xs:w-auto xs:max-w-full xs:mx-2.5',
        className,
      )}
      style={{ minWidth, ...style }}
      {...props}
    />
  ),
)
ModalContainer.displayName = 'ModalContainer'
