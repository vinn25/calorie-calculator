import React from 'react';

interface Props {
    cardTitle: string;
    subCardTitle?: string;
    children?: React.ReactNode;
}

const Card = ({ cardTitle, subCardTitle, children }: Props) => {
    return (
        <div className="max-h-full rounded-[12px] border border-primary-dark bg-primary-light p-6 text-primary-dark shadow-14">
            <div className="rounded-md p-2 text-text-md">{cardTitle}</div>
            <div className="mt-3 rounded-[12px] border border-primary-dark bg-white p-6 shadow-md">
                <div className="mb-5 rounded-md p-2 text-text-xl">
                    {subCardTitle}
                </div>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};

export default Card;
