import { Icon } from '@iconify/react';
import React from 'react';

import { Buttons } from '@/components/button';
import { LoadingSpinner } from '@/components/loading';

interface Props {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
    color: 'primary' | 'danger';
    onClose?: any;
    onClickOutside?: any;
    textYes: string;
    textNo: string;
    onConfirm?: any;
    onDecline?: any;
    disabled?: boolean;
    loading?: boolean;
}

const DialogConfirmation = ({
    isOpen,
    title,
    subtitle,
    children,
    color,
    onClose,
    onClickOutside,
    textYes,
    textNo,
    onConfirm,
    onDecline,
    disabled,
    loading,
}: Props) => {
    return (
        <div>
            {isOpen ? (
                <>
                    <div className="fixed inset-0 z-99999 m-auto flex w-[697px] items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative w-[697px]">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                                <div className="flex items-start justify-between rounded-t border-b border-solid border-neutral-300 p-5">
                                    <span className="">
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
                                <div className="table w-full items-center justify-between rounded-b border-t border-solid border-neutral-100 p-5">
                                    <div className="table-cell w-1/2 px-2">
                                        <Buttons
                                            variant="outline"
                                            size="md"
                                            type="button"
                                            text={
                                                loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    textNo
                                                )
                                            }
                                            fullWidth
                                            onClick={onDecline}
                                            color="neutral"
                                            disabled={disabled}
                                        />
                                    </div>
                                    <div className="table-cell w-1/2 px-2">
                                        {/* <ButtonDanger
                                            variant="contained"
                                            size="md"
                                            type="submit"
                                            text={textYes}
                                            fullWidth
                                            onClick={onConfirm}
                                        /> */}
                                        <Buttons
                                            variant="contained"
                                            size="md"
                                            type="submit"
                                            text={
                                                loading ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    textYes
                                                )
                                            }
                                            color={color}
                                            fullWidth
                                            onClick={onConfirm}
                                            disabled={disabled}
                                        />
                                    </div>
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

export default DialogConfirmation;
