import React from 'react'
import { cn } from '@lib/utils'
import { XIcon, ArrowLeftIcon } from 'lucide-react'
import { ModalProps } from './types'

interface ModalHeaderProps {
  background?: string
  className?: string
  children?: React.ReactNode
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ background, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex items-center justify-center px-6 pt-8 pb-3.5 pl-8', className)}
      style={{ background: background || 'transparent' }}
      {...props}
    >
      {children}
    </div>
  ),
)
ModalHeader.displayName = 'ModalHeader'

export const ModalTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-1 items-center justify-center', className)} {...props} />
  ),
)
ModalTitle.displayName = 'ModalTitle'

interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  p?: string
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(({ className, p, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col max-h-[90vh] overflow-y-auto', className)}
    style={{ padding: p || '32px', ...style }}
    {...props}
  />
))
ModalBody.displayName = 'ModalBody'

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps['onDismiss'] }> = ({ onDismiss }) => {
  return (
    <button
      onClick={onDismiss}
      className="absolute right-4 top-6 p-2 rounded-md hover:bg-accent transition-colors"
      aria-label="Close the dialog"
    >
      <XIcon className="w-5 h-5 text-foreground" />
    </button>
  )
}

export const ModalBackButton: React.FC<{ onBack: ModalProps['onBack'] }> = ({ onBack }) => {
  return (
    <button onClick={onBack} className="p-2 mr-2 rounded-md hover:bg-accent transition-colors" aria-label="Go back">
      <ArrowLeftIcon className="w-5 h-5 text-primary" />
    </button>
  )
}

interface ModalContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  minWidth?: string
}

export const ModalContainer = React.forwardRef<HTMLDivElement, ModalContainerProps>(
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
