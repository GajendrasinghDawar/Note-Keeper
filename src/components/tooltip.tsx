import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

const Tooltip = React.forwardRef<HTMLButtonElement, TooltipProps>(function Tooltip(
  { children, content, open, defaultOpen, onOpenChange, ...props },
  ref
) {
  return (
    <TooltipPrimitive.Provider delayDuration={600} skipDelayDuration={500}>
      <TooltipPrimitive.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <TooltipPrimitive.Trigger asChild ref={ref}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-sm bg-slate4  text-[15px] leading-none will-change-[transform,opacity] hover:bg-slate4 border-none text-slate12 text-sm font-medium p-2 z-10'
          side='bottom'
          align='center'
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow width={11} height={5} className='fill-slate4 ' />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
})

export default Tooltip
