import React from 'react'

interface MenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
}

export const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ onClick, isActive, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={`rounded-lg p-1 bg-slate3  hover:bg-slate4 border border-slate5 flex justify-center items-center min-w-6 min-h-6 ${isActive ? 'bg-slate5 text-slate12 border-slate9 ' : ''} ${disabled ? ' opacity-80 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
)
