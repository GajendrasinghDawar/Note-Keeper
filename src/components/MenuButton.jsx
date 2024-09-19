import React from "react";

export const MenuButton = React.forwardRef(({ onClick, isActive, children, disabled, ...props }, ref) => (
    <button
        ref={ ref }
        onClick={ onClick }
        className={ `rounded-lg p-1 bg-gray-gray3  hover:bg-gray-gray4 border border-gray-gray5 flex justify-center items-center min-w-6 min-h-6 ${isActive ? "bg-gray-gray5 text-gray-gray12 border-sand-sand9 " : ""} ${disabled ? " opacity-80 cursor-not-allowed" : ""}` }
        { ...props }
    >
        { children }
    </button>
));