import { LoadingSpinner } from '@/components/loading';
import { Icon } from '@iconify/react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: any;
    type: JSX.IntrinsicElements['button']['type'];
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'danger' | 'neutral';
    variant: 'contained' | 'text' | 'outline';
    icon?: string;
    iconSize?: number;
    fullWidth?: boolean;
    loading?: boolean;
    disabled?: boolean;
}

const Buttons = ({
    text,
    type,
    variant,
    size,
    color,
    icon,
    iconSize,
    fullWidth,
    loading,
    disabled,
    ...props
}: Props) => {
    // size
    const textSize = size === 'sm' ? 'text-sm' : 'text-md';
    const paddingSize =
        size === 'sm'
            ? 'px-[14px] py-2'
            : size === 'md'
              ? 'px-4 py-[10px]'
              : 'px-[18px] py-[10px]';

    // color
    const containedColor =
        color === 'primary'
            ? 'bg-primary hover:bg-primary-light hover:text-primary'
            : color === 'danger'
              ? 'bg-danger-600 hover:border-danger-600 hover:bg-danger-700'
              : 'bg-neutral-600 hover:border-neutral-600 hover:bg-neutral-700';
    const textColor =
        color === 'primary'
            ? 'text-primary'
            : color === 'danger'
              ? 'text-danger-600'
              : 'text-neutral-600';
    const outlineColor =
        color === 'primary'
            ? 'border-primary text-primary hover:bg-primary-light'
            : color === 'danger'
              ? 'border-danger-600 text-danger-600 hover:bg-danger-50'
              : 'border-neutral-600 text-neutral-600 hover:bg-neutral-50';

    return variant === 'contained' ? (
        <button
            className={`flex items-center justify-center gap-2 border border-transparent ${containedColor} ${textSize} ${paddingSize} ${fullWidth && 'w-full'} rounded-md font-normal text-white`}
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
                    // className=""
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    ) : variant === 'text' ? (
        <button
            className={`flex items-center justify-center gap-2 rounded-md border-transparent bg-transparent ${textColor} hover:bg-slate-50 ${textSize} ${paddingSize} ${fullWidth ? 'w-full' : 'w-auto'}`}
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
                    // className="m-auto"
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    ) : (
        <button
            className={`flex items-center justify-center gap-2 rounded-md border ${outlineColor} bg-transparent ${textSize} ${paddingSize} ${fullWidth && 'w-full'}`}
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
                    // className="m-auto"
                />
            )}
            {text && !loading && <span>{text}</span>}
            {loading && <LoadingSpinner />}
        </button>
    );
};

export default Buttons;
