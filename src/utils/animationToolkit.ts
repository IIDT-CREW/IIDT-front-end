import { Variants } from 'framer-motion'

export const animationHandler = (element: HTMLDivElement | null) => {
  if (!element) return
  if (element.classList.contains('appear')) {
    element.classList.remove('appear')
    element.classList.add('disappear')
  } else {
    element.classList.remove('disappear')
    element.classList.add('appear')
  }
}

export const animationVariants: Variants = {
  initial: { transform: 'translateX(0px)' },
  animate: { transform: 'translateX(0px)' },
  exit: { transform: 'translateX(0px)' },
}

export const animationMap = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
}
