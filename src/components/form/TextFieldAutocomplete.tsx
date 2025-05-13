import React, { useState } from 'react';

interface PropsOption {
    key: any;
    text: string;
    value: string;
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    options: PropsOption[];
    onChange: any;
    onSelected: any;
    contentBefore?: any;
    contentAfter?: any;
    fullWidth?: boolean;
    error?: boolean;
    helperText?: any;
    align?: 'right' | 'left' | 'center';
    defaultText?: string;
    nullValue?: boolean;
    nullValueText?: string;
    defaultValue?: string;
}

// const options: PropsOption[] = [
//     {
//         key: 'Nama1',
//         text: 'Nama 1',
//         value: '1',
//     },
//     {
//         key: 'Nama2',
//         text: 'Nama 2',
//         value: '2',
//     },
//     {
//         key: 'Nama3',
//         text: 'Nama 3',
//         value: '3',
//     },
// ];

const TextFieldAutocomplete = ({
    contentBefore,
    contentAfter,
    fullWidth,
    error,
    helperText,
    align,
    options,
    defaultText,
    nullValue,
    nullValueText,
    defaultValue,
    onChange,
    onSelected,
    ...props
}: Props) => {
    const [openOption, setOpenOption] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue || '');
    const [SelectedText, setSelectedText] = useState(defaultText || '');
    const handleSelectvalue = (value: string, text: string) => {
        setSelectedText(text);
        setOpenOption(false);
        setSelectedValue(value);
        onSelected(value);
    };
    const handleInputChange = (event: any) => {
        setSelectedText(event.target.value);
        onChange(event.target.value);
    };
    return (
        <div className="relative">
            <span
                className={`inline-flex gap-1 ${fullWidth && 'w-full'} rounded-[4px] border ${error ? 'border-danger-600' : 'border-[#cfcfcf]'} p-2 transition-all focus-within:border-b-2 focus-within:border-b-slate-600 focus-visible:outline-none`}
            >
                {contentBefore && (
                    <span className="m-auto box-border">{contentBefore}</span>
                )}
                <input
                    className={`${fullWidth && 'w-full'} focus-visible:outline-none ${align === 'right' ? 'text-right' : align === 'left' ? 'text-left' : align === 'center' ? 'text-center' : 'text-left'}`}
                    onFocus={() => {
                        setOpenOption(true);
                    }}
                    defaultValue={defaultValue}
                    value={SelectedText}
                    onChange={handleInputChange}
                    {...props}
                />
                <div className="hidden">
                    <select value={selectedValue}>
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
                </div>
                {contentAfter && (
                    <span className="m-auto box-border">{contentAfter}</span>
                )}
                {openOption && (
                    <div className="absolute left-0 top-full z-9999 max-h-[200px] w-full overflow-auto rounded-md bg-white shadow-2">
                        <ul>
                            {nullValue && nullValueText && (
                                <button
                                    onClick={() =>
                                        handleSelectvalue('', nullValueText)
                                    }
                                    className="w-full text-left"
                                    type="button"
                                    key="nodataselect"
                                >
                                    <li className="cursor-pointer px-5 py-2 text-text-sm hover:bg-neutral-50">
                                        {nullValueText}
                                    </li>
                                </button>
                            )}
                            {options.map(data => (
                                <button
                                    onClick={() =>
                                        handleSelectvalue(data.value, data.text)
                                    }
                                    className="w-full text-left"
                                    type="button"
                                    key={data.value}
                                >
                                    <li className="cursor-pointer px-5 py-2 text-text-sm hover:bg-neutral-50">
                                        {data.text}
                                    </li>
                                </button>
                            ))}
                        </ul>
                    </div>
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

export default TextFieldAutocomplete;
