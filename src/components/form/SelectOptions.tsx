import { Icon } from '@iconify/react';
import React, { useId } from 'react';

interface PropsOption {
    key: any;
    text: string;
    value: any;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    name: string;
    options: PropsOption[];
    selectSize: 'sm' | 'md';
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
    label?: string;
    nullValue?: boolean;
    nullValueText?: string;
}

const SelectOptions = ({
    label,
    options,
    selectSize,
    error,
    helperText,
    fullWidth,
    nullValue,
    nullValueText,
    ...props
}: Props) => {
    const selectId = useId();
    const componentSize = selectSize === 'sm' ? 'h-8' : 'h-10';
    return (
        <div className={`${fullWidth && 'w-full'}`}>
            <label htmlFor={`${selectId}-outline`}>{label}</label>
            <span
                className={`relative box-border flex flex-nowrap items-center whitespace-nowrap rounded-md border ${error ? 'border-danger-600' : 'border-primary-light'} focus-within:border-b-neutral transition-all focus-within:border-b-2 focus-visible:outline-none`}
            >
                <select
                    className={`${componentSize} w-full grow cursor-pointer appearance-none rounded-md bg-white px-2 text-text-lg focus-visible:outline-none`}
                    {...props}
                >
                    {nullValue && nullValueText && (
                        <option key="null" value="">
                            {nullValueText}
                        </option>
                    )}
                    {options.map(option => (
                        <option key={option.key} value={option.value}>
                            {option.text}
                        </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-2 block">
                    <Icon
                        icon="fluent:chevron-down-20-regular"
                        width={20}
                        height={20}
                    />
                </span>
            </span>

            {error && (
                <div className="text-left text-text-sm font-medium text-red">
                    {helperText}
                </div>
            )}
        </div>
    );
};

export default SelectOptions;
