import { LoadingSpinner } from '@/components/loading';
import React from 'react';

interface Props {
    text: string;
    onClick?: () => void;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    variant: 'contained' | 'text' | 'outline';
    icon?: any;
    fullWidth?: boolean;
    loading?: boolean;
}

const ButtonDanger = ({
    text,
    type,
    variant,
    size,
    icon,
    onClick,
    fullWidth,
    loading,
}: Props) => {
    const textSize = size === 'sm' ? 'text-sm' : 'text-md';
    const paddingSize =
        size === 'sm'
            ? 'px-[14px] py-2'
            : size === 'md'
              ? 'px-4 py-[10px]'
              : 'px-[18px] py-[10px]';

    return variant === 'contained' ? (
        <button
            className={`flex justify-center gap-2 border border-transparent bg-danger-600 ${textSize} ${paddingSize} ${fullWidth && 'w-full'} rounded-md font-normal text-white hover:border-danger-600 hover:bg-transparent hover:text-danger-600`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            onClick={onClick}
        >
            {icon}
            <span>{loading ? <LoadingSpinner /> : text}</span>
        </button>
    ) : variant === 'text' ? (
        <button
            className={`flex justify-center gap-2 rounded-md border-transparent bg-transparent text-danger-600 hover:bg-danger-50 ${textSize} ${paddingSize} ${fullWidth ? 'w-full' : 'w-auto'}`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            onClick={onClick}
        >
            {icon}
            <span>{loading ? <LoadingSpinner /> : text}</span>
        </button>
    ) : (
        <button
            className={`flex justify-center gap-2 rounded-md border border-danger-600 bg-transparent text-danger-600 hover:bg-danger-50 ${textSize} ${paddingSize} ${fullWidth && 'w-full'}`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            onClick={onClick}
        >
            {icon}
            <span>{loading ? <LoadingSpinner /> : text}</span>
        </button>
    );
};

export default ButtonDanger;
