import { Icon } from '@iconify/react';
import React from 'react';

interface Props {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    onClickOutside?: () => void;
}

const DialogForm = ({
    isOpen,
    title,
    subtitle,
    children,
    onClose,
    onClickOutside,
}: Props) => {
    return (
        <div>
            {isOpen ? (
                <>
                    <div className="fixed inset-0 z-99999 m-auto flex w-[544px] items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative w-[544px]">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-neutral-300 p-5">
                                    <span className="text-neutral">
                                        <div className="w-full text-text-lg font-semibold">
                                            {title}
                                        </div>
                                        <div className="w-full text-text-sm">
                                            {subtitle}
                                        </div>
                                    </span>
                                    <span className="flex w-6 cursor-pointer bg-transparent text-title-sm text-[#212121] focus:outline-none">
                                        <Icon
                                            icon="fluent:dismiss-24-regular"
                                            width="24"
                                            height="24"
                                            onClick={onClose}
                                        />
                                    </span>
                                </div>
                                <div className="relative flex-auto p-6">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClickOutside} type="button">
                        <div className="fixed inset-0 z-9999 bg-black/30">
                            {' '}
                        </div>
                    </button>
                </>
            ) : null}
        </div>
    );
};

export default DialogForm;
