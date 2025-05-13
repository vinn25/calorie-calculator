import { Icon } from '@iconify/react';
import React from 'react';

const DialogOptions = () => {
    return (
        <div className="flex flex-col gap-[14px] rounded-[10px] bg-warning-50 px-[18px] py-[16px]">
            <div className="flex items-center gap-[4px]">
                <Icon icon="fluent:info-20-regular" width="20" height="20" />
                <p className="text-text-md font-semibold">Recovery Options:</p>
            </div>
            <div className="flex flex-col gap-[6px] pl-[24px]">
                <p className="text-text-sm font-semibold">1. Reset Password:</p>
                <p className="gap-[10px] px-[14px] text-text-sm font-medium">
                    Click <b className="text-slate-600">Forgot Password</b> to
                    start the password reset process.
                </p>
            </div>
            <div className="flex flex-col gap-[6px] pl-[24px]">
                <p className="text-text-sm font-semibold">2. Contact Admin:</p>
                <p className="gap-[10px] px-[14px] text-text-sm font-medium">
                    If you&apos;re unable to reset your password, contact the
                    administrator at{' '}
                    <b>
                        <i>admin@example.id</i>
                    </b>{' '}
                    for assistance
                </p>
            </div>
        </div>
    );
};

export default DialogOptions;
