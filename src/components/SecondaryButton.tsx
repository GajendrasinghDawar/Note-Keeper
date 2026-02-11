export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            type={ type }
            className={
                `  ring-offset-2 ring-2 ring-sand-sand7 inline-flex items-center px-4 py-2 bg-sand-sand5  border border-transparent  font-semibold text-xs uppercase tracking-widest
                 hover:ring-sand-sand8   active:bg-sand-sand6 focus:outline-none focus:ring-2
                focus:ring-sand-sand9 focus:ring-offset-2 
                transition ease-in-out duration-150 rounded-lg text-gray-gray11  ${className}`
            }
            disabled={ disabled }
            { ...props }
        >
            { children }
        </button>
    );
}