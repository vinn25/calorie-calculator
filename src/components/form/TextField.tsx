import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    align?: 'right' | 'left' | 'center';
}

const TextField = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    align,
    ...props
}: Props) => {
    return (
        <div>
            <span
                className={`inline-flex gap-1 text-neutral ${fullWidth && 'w-full'} rounded-[4px] border ${error ? 'border-danger-600' : 'border-primary-light'} p-2 transition-all focus-within:border-b-2 focus-within:border-b-secondary-dark focus-visible:outline-none`}
            >
                {contentBefore && (
                    <span className="m-auto box-border">{contentBefore}</span>
                )}
                <input
                    {...props}
                    className={`${fullWidth && 'w-full'} focus-visible:outline-none ${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-left'}`}
                />
                {contentAfter && (
                    <span className="m-auto box-border">{contentAfter}</span>
                )}
            </span>
            {error && (
                <div className="text-left text-text-sm font-medium text-danger-600">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextField;
