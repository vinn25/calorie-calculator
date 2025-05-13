import { LoadingSpinner } from '@/components/loading';
import { Icon } from '@iconify/react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    variant: 'contained' | 'text' | 'outline';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const ButtonPrimary = ({
    text,
    type,
    variant,
    size,
    icon,
    iconSize,
    fullWidth,
    loading,
    disabled,
    ...props
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
            className={`flex justify-center gap-2 border border-transparent bg-slate-600 ${textSize} ${paddingSize} ${fullWidth && 'w-full'} rounded-md font-normal text-white hover:border-slate-600 hover:bg-slate-700`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            disabled={disabled}
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    ) : variant === 'text' ? (
        <button
            className={`flex justify-center gap-2 rounded-md border-transparent bg-transparent text-slate-600 hover:bg-slate-50 ${textSize} ${paddingSize} ${fullWidth ? 'w-full' : 'w-auto'}`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            disabled={disabled}
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    ) : (
        <button
            className={`flex justify-center gap-2 rounded-md border border-slate-600 bg-transparent text-slate-600 hover:bg-slate-50 ${textSize} ${paddingSize} ${fullWidth && 'w-full'}`}
            type={
                type === 'button'
                    ? 'button'
                    : type === 'submit'
                      ? 'submit'
                      : 'reset'
            }
            disabled={disabled}
            {...props}
        >
            {icon && (
                <Icon
                    icon={`${icon}`}
                    width={iconSize}
                    height={iconSize}
                    className="m-auto"
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    );
};

export default ButtonPrimary;
