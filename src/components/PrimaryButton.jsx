export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            { ...props }
            className={
                `  ring-offset-2 ring-2 ring-sand-sand12 inline-flex items-center px-4 py-2 bg-sand-sand12  border border-transparent  font-semibold text-xs uppercase tracking-widest
                 hover:ring-sand-sand11   active:bg-sand-sand9 focus:outline-none focus:ring-2
                focus:ring-sand-sand10 focus:ring-offset-2 
                transition ease-in-out duration-150 rounded-lg  ${disabled && "opacity-25"
                } text-sand-sand7 ${className}`
            }
            disabled={ disabled }
        >
            { children }
        </button>
    );
}