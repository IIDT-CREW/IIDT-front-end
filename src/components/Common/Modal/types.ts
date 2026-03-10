export interface ModalTheme {
  background: string
}

export type Handler = () => void

export interface InjectedProps {
  onDismiss?: Handler
}

export interface ModalProps extends InjectedProps, React.HTMLAttributes<HTMLDivElement> {
  title?: string
  hideTitle?: boolean
  hideCloseButton?: boolean
  onBack?: () => void
  bodyPadding?: string
  headerBackground?: string
  minWidth?: string
  children?: any
}
