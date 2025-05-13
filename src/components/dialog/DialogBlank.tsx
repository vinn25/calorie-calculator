import { Icon } from '@iconify/react';
import React from 'react';

// import ButtonDanger from '@/components/button/ButtonDanger';

interface Props {
    isOpen: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
    onClickOutside?: () => void;
}

const DialogBlank = ({ isOpen, children, onClose, onClickOutside }: Props) => {
    return (
        <div>
            {isOpen ? (
                <>
                    <div className="fixed inset-0 z-99999 m-auto max-h-full max-w-[700px] items-center justify-center overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative w-auto rounded-lg border-0 bg-white shadow-lg">
                            <span className="absolute right-4 top-4 z-999 w-6 cursor-pointer bg-transparent text-title-sm text-[#212121] focus:outline-none">
                                <Icon
                                    icon="fluent:dismiss-24-regular"
                                    width="20"
                                    height="20"
                                    onClick={onClose}
                                />
                            </span>
                            <div className="relative max-h-full overflow-auto p-5">
                                {children}
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

export default DialogBlank;
