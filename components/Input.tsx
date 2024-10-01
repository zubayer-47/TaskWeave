import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, ...props }: InputProps) {
    return (
        <div>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input className='px-3 py-2.5 focus:outline-none rounded-lg bg-slate-300 text-slate-900' {...props} />
        </div>
    );
}