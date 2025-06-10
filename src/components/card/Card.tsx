import React from 'react';

interface Props {
    cardTitle: string;
    subCardTitle?: string;
    children?: React.ReactNode;
    addOns?: any;
}

const Card = ({ cardTitle, subCardTitle, children, addOns }: Props) => {
    return (
        <div className="max-h-full rounded-[12px] border border-primary-dark bg-primary-light p-6 text-primary-dark shadow-14">
            <div className="rounded-md p-2 text-text-md">{cardTitle}</div>
            <div className="mt-3 rounded-[12px] border border-primary-dark bg-white p-6 shadow-md">
                <div
                    className={`${addOns && 'flex items-center justify-between'} mb-2 rounded-md p-2 text-text-xl`}
                >
                    <div>{subCardTitle}</div>
                    <div>{addOns}</div>
                </div>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};

export default Card;
