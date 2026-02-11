import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface ModalContentProps {
  open: boolean
  children: React.ReactNode
}

type ModalComponent = React.FC<ModalProps> & {
  Trigger: typeof Dialog.Trigger
  Close: typeof Dialog.Close
  Content: React.FC<ModalContentProps>
  Title: typeof Dialog.Title
  Description: typeof Dialog.Description
}

const Modal: ModalComponent = function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  )
} as ModalComponent

const overlayVariants = {
  open: {
    opacity: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    transition: { ease: 'easeOut', duration: 0.1 },
  },
  closed: {
    opacity: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    transition: { ease: 'easeIn', duration: 0.2 },
  },
}

const dialogVariants = {
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: { ease: 'easeOut', duration: 0.2 },
  },
}

function ModalContent({ open, children }: ModalContentProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay
            className='fixed inset-0 overflow-y-auto flex items-center justify-center'
            asChild
          >
            <motion.div initial='closed' animate='open' exit='closed' variants={overlayVariants}>
              <Dialog.Content
                className='max-h-[85vh] w-[90vw] max-w-[450px] rounded-lg focus:outline-none relative  flex flex-col bg-slate2 shadow-xl shadow-slate7'
                asChild
              >
                <motion.div initial='closed' animate='open' exit='closed' variants={dialogVariants}>
                  {children}
                </motion.div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Overlay>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  )
}

Modal.Trigger = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
Modal.Title = Dialog.Title
Modal.Description = Dialog.Description

export default Modal
