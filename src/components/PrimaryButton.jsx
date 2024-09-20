import { SpringIcon } from "@/components/Icons";

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            { ...props }
            className={
                `hover:ring-offset-2
                hover:ring-2 hover:ring-sand-sand12 inline-flex items-center px-4 py-2 bg-sand-sand12  border border-transparent
                font-semibold text-xs
                uppercase tracking-widest
                active:ring-sand-sand12 focus:outline-none focus:ring-2
                focus:ring-sand-sand12 focus:ring-offset-2
                transition ease-in-out duration-150 rounded-lg  ${disabled && "opacity-25"
                } text-sand-sand7 ${className}`
            }
            disabled={ disabled }
        >
            <SpringIcon className={ 'mr-2' } />
            { children }
        </button>
    );
}