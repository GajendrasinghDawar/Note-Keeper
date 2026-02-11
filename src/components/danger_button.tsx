import React from 'react'

export default function DangerButton({
  className = '',
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2  border border-transparent rounded-md font-semibold text-xs
                uppercase
                tracking-widest
                text-slate12
                hover:bg-red10
                bg-red9
                active:bg-red10 ring-offset-2 ring-2 ring-red10 focus:outline-none focus:ring-2 focus:ring-red7 focus:ring-offset-2 transition ease-in-out duration-150 ${
                  disabled && 'opacity-25'
                } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  )
}
