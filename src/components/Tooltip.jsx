import React, { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

function Tooltip({
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    ...props
}, ref) {
    return (
        <TooltipPrimitive.Provider delayDuration={ 600 } skipDelayDuration={ 500 }>
            <TooltipPrimitive.Root
                open={ open }
                defaultOpen={ defaultOpen }
                onOpenChange={ onOpenChange }
            >
                <TooltipPrimitive.Trigger asChild ref={ ref }>
                    { children }
                </TooltipPrimitive.Trigger>
                <TooltipPrimitive.Content
                    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-gray-gray4  text-[15px] leading-none will-change-[transform,opacity] hover:bg-gray-gray4 border-none text-gray-gray12 text-sm font-medium p-2 z-10"
                    side="bottom" align="center" { ...props }>
                    { content }
                    <TooltipPrimitive.Arrow width={ 11 } height={ 5 } className='fill-gray-gray4 ' />
                </TooltipPrimitive.Content>
            </TooltipPrimitive.Root>
        </TooltipPrimitive.Provider>
    );
}

export default forwardRef(Tooltip);
