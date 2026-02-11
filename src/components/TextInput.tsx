import React, { useEffect, useRef } from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isFocused?: boolean;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
    function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
        const localRef = useRef<HTMLInputElement>(null);
        const inputRef = (ref as React.RefObject<HTMLInputElement>) || localRef;

        useEffect(() => {
            if (isFocused) {
                inputRef.current?.focus();
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
                ref={ inputRef }
            />
        );
    }
);

export default TextInput;
