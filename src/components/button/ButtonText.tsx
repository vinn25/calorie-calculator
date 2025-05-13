import { LoadingSpinner } from '@/components/loading';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'danger' | 'neutral';
    loading?: boolean;
    type: JSX.IntrinsicElements['button']['type'];
}

const ButtonText = ({ text, size, color, loading, type, ...props }: Props) => {
    const textSize = size === 'sm' ? 'text-sm' : 'text-md';
    const textColor =
        color === 'primary'
            ? 'text-slate-600'
            : color === 'danger'
              ? 'text-danger-600'
              : 'text-neutral-600';
    return (
        <button
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            className={`flex justify-center gap-2 rounded-md border-transparent bg-transparent ${textColor} ${textSize}`}
            {...props}
        >
            <span>{loading ? <LoadingSpinner /> : text}</span>
        </button>
    );
};

export default ButtonText;
