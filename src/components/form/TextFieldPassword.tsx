import { Icon } from '@iconify/react';
import { useState } from 'react';

import ButtonIcon from '@/components/button/ButtonIcon';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    helperText?: any;
    fullWidth?: boolean;
}

const TextFieldPassword = ({
    error,
    helperText,
    fullWidth,
    ...props
}: Props) => {
    const [visible, setVisible] = useState(false);
    const handleVisibilityPassword = () => {
        setVisible(!visible);
    };
    return (
        <div>
            <span
                className={`inline-flex gap-1 ${fullWidth && 'w-full'} rounded-[4px] border ${error ? 'border-danger-600' : 'border-primary-light'} p-2 transition-all focus-within:border-b-2 focus-within:border-b-slate-600 focus-visible:outline-none`}
            >
                <span className="m-auto box-border">
                    <Icon
                        icon="fluent:key-16-regular"
                        width="16"
                        height="16"
                        color="#7E7E7E"
                    />
                </span>
                <input
                    {...props}
                    type={visible ? 'text' : 'password'}
                    className={`${fullWidth && 'w-full'} text-neutral focus-visible:outline-none`}
                />
                <ButtonIcon
                    icon={
                        visible ? (
                            <Icon
                                icon="fluent:eye-16-regular"
                                width="16"
                                height="16"
                                color="#7E7E7E"
                            />
                        ) : (
                            <Icon
                                icon="fluent:eye-off-16-regular"
                                width="16"
                                height="16"
                                color="#7E7E7E"
                            />
                        )
                    }
                    onClick={handleVisibilityPassword}
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

export default TextFieldPassword;
