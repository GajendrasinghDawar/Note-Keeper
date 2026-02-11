import { SpringIcon } from './icons'

export default function PrimaryButton({
  className = '',
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`hover:ring-offset-2
                hover:ring-2 hover:ring-slate12 inline-flex items-center px-4 py-2 bg-slate12  border border-transparent
                font-semibold text-xs
                uppercase tracking-widest
                active:ring-slate12 focus:outline-none focus:ring-2
                focus:ring-slate12 focus:ring-offset-2
                transition ease-in-out duration-150 rounded-lg  ${
                  disabled && 'opacity-25'
                } text-slate1 ${className}`}
      disabled={disabled}
    >
      <SpringIcon className='size-4 mr-2' />
      {children}
    </button>
  )
}
