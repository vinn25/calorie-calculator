import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
}

const TextFieldArea = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    ...props
}: Props) => {
    return (
        <div>
            <span
                className={`inline-flex gap-1 ${fullWidth && 'w-full'} rounded-[4px] border ${error ? 'border-danger-600' : 'border-[#cfcfcf]'} p-2 transition-all focus-within:border-b-2 focus-within:border-b-slate-600 focus-visible:outline-none`}
            >
                {contentBefore && (
                    <span className="m-auto box-border">{contentBefore}</span>
                )}
                <textarea
                    {...props}
                    className={`${fullWidth && 'w-full'} focus-visible:outline-none`}
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

export default TextFieldArea;
