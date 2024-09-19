import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ open, onOpenChange, children }) {
    return (
        <Dialog.Root open={ open } onOpenChange={ onOpenChange }>
            { children }
        </Dialog.Root>
    )
}

let overlayVariants = {
    open: {
        opacity: 1,
        backgroundColor: "rgba(0, 0, 0, 0.15)",
        transition: { ease: "easeOut", duration: 0.1 }
    },
    closed: {
        opacity: 0,
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        transition: { ease: "easeIn", duration: 0.2 }
    }
}

let dialogVariants = {
    closed: {
        opacity: 0, scale: 0.8,
        transition: { ease: "easeIn", duration: 0.2 }
    },
    open: {
        opacity: 1, scale: 1,
        transition: { ease: "easeOut", duration: 0.2 }
    }
}

function ModalContent({ open, children }) {
    return (
        <AnimatePresence>
            { open && (
                <Dialog.Portal forceMount>
                    <Dialog.Overlay className="fixed inset-0 overflow-y-auto flex items-center justify-center" asChild>
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={ overlayVariants }
                        >
                            <Dialog.Content
                                className="max-h-[85vh] w-[90vw] max-w-[450px] rounded-lg focus:outline-none relative  flex flex-col bg-sand-sand2 shadow-xl shadow-sand-sand7"
                                asChild
                            >
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={ dialogVariants }
                                >
                                    { children }
                                </motion.div>
                            </Dialog.Content>
                        </motion.div>
                    </Dialog.Overlay>
                </Dialog.Portal>
            ) }
        </AnimatePresence>
    )
}

Modal.Trigger = Dialog.Trigger
Modal.Close = Dialog.Close
Modal.Content = ModalContent
Modal.Title = Dialog.Title
Modal.Description = Dialog.Description
Modal.Close = Dialog.Close 