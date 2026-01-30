import React, { cloneElement } from 'react'
import { cn } from '@lib/utils'
import { InputGroupProps, scales, Scales } from './types'

const InputGroup = ({
  scale = scales.MD,
  startIcon,
  endIcon,
  children,
  className,
  ...props
}: InputGroupProps & { className?: string }): JSX.Element => {
  const iconPositionClass = scale === scales.SM ? 'left-2' : 'left-4'
  const endIconPositionClass = scale === scales.SM ? 'right-2' : 'right-4'

  const inputPaddingLeft = startIcon ? (scale === scales.SM ? 'pl-8' : scale === scales.LG ? 'pl-14' : 'pl-12') : 'pl-4'
  const inputPaddingRight = endIcon ? (scale === scales.SM ? 'pr-8' : scale === scales.LG ? 'pr-14' : 'pr-12') : 'pr-4'

  return (
    <div className={cn('relative w-full', className)} {...props}>
      {startIcon && (
        <div className={cn('absolute top-0 h-full flex items-center', iconPositionClass)}>{startIcon}</div>
      )}
      {cloneElement(children, {
        scale,
        className: cn(inputPaddingLeft, inputPaddingRight, children.props.className),
      })}
      {endIcon && (
        <div className={cn('absolute top-0 h-full flex items-center', endIconPositionClass)}>{endIcon}</div>
      )}
    </div>
  )
}

export default InputGroup
