import React from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
}

const TextArea = ({ fullWidth, error, helperText, ...props }: Props) => {
    return (
        <div>
            <span
                className={`inline-flex gap-1 ${fullWidth && 'w-full'} rounded-[4px] border ${error ? 'border-danger-600' : 'border-[#cfcfcf]'} p-2 transition-all focus-within:border-b-2 focus-within:border-b-slate-600 focus-visible:outline-none`}
            >
                <textarea
                    {...props}
                    className={`${fullWidth && 'w-full'} focus-visible:outline-none`}
                />
            </span>
            {error && (
                <div className="text-left text-text-sm font-medium text-danger-600">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default TextArea;
