import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion'
import React, { createContext, useRef, useState } from 'react'
import { cn } from '@lib/utils'
import { Handler } from './types'

interface ModalsContext {
  isOpen: boolean
  nodeId: string
  modalNode: React.ReactNode
  setModalNode: React.Dispatch<React.SetStateAction<React.ReactNode>>
  onPresent: (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => void
  onDismiss: Handler
}

export const Context = createContext<ModalsContext>({
  isOpen: false,
  nodeId: '',
  modalNode: null,
  setModalNode: () => null,
  onPresent: () => null,
  onDismiss: () => null,
})

type ModalProviderProps = {
  children?: React.ReactNode
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalNode, setModalNode] = useState<React.ReactNode>()
  const [nodeId, setNodeId] = useState('')
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true)

  const handlePresent = (node: React.ReactNode, newNodeId: string, closeOverlayClick: boolean) => {
    setModalNode(node)
    setIsOpen(true)
    setNodeId(newNodeId)
    setCloseOnOverlayClick(closeOverlayClick)
  }

  const handleDismiss = () => {
    setModalNode(undefined)
    setIsOpen(false)
    setNodeId('')
    setCloseOnOverlayClick(true)
  }

  const handleOverlayDismiss = () => {
    if (closeOnOverlayClick) {
      handleDismiss()
    }
  }

  return (
    <Context.Provider
      value={{
        isOpen,
        nodeId,
        modalNode,
        setModalNode,
        onPresent: handlePresent,
        onDismiss: handleDismiss,
      }}
    >
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
              className={cn(
                'fixed inset-0 z-[99] flex flex-col items-center justify-center',
                'will-change-[opacity]',
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-white/60 dark:bg-black/60"
                onClick={handleOverlayDismiss}
              />
              {/* Modal Content */}
              <m.div
                className="relative z-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {React.isValidElement(modalNode) &&
                  React.cloneElement(modalNode as React.ReactElement<any>, {
                    onDismiss: handleDismiss,
                  })}
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
      {children}
    </Context.Provider>
  )
}

export default ModalProvider
