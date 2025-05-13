import React from 'react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    key: string;
    value: string;
    name: string;
    label: any;
}

const RadioButtons = ({ key, value, name, label, ...props }: Props) => {
    return (
        <div key={key} className="w-full text-text-sm font-medium">
            <span>
                <div className="flex w-full items-center rounded-md p-2 hover:cursor-pointer hover:bg-slate-50">
                    <input
                        type="radio"
                        id={value}
                        name={name}
                        value={value}
                        className="mr-3 size-4 accent-slate-600 hover:cursor-pointer"
                        {...props}
                    />
                    <label
                        className="w-full hover:cursor-pointer"
                        htmlFor={value}
                    >
                        {label}
                    </label>
                </div>
            </span>
        </div>
    );
};

export default RadioButtons;
