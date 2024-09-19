import React from 'react';
import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused)
        {
            input.current.focus();
        }
    }, []);

    return (
        <input
            { ...props }
            type={ type }
            className={
                "border  border-sand-sand6 focus:bg-sand-sand4 focus:border-sand-sand9 focus:ring-0 rounded-lg " +
                className
            }
            ref={ input }
        />
    );
});