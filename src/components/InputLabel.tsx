interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    value?: string;
    className?: string;
}

export default function InputLabel({ value, className = '', children, ...props }: InputLabelProps) {
    return (
        <label { ...props } className={ `block font-medium text-sm  ` + className }>
            { value ? value : children }
        </label>
    );
}