import React from 'react';

interface Props {
    cardTitle: string;
    subCardTitle?: string;
    children?: React.ReactNode;
}

const Card = ({ cardTitle, subCardTitle, children }: Props) => {
    return (
        <div className="max-h-full rounded-md border border-[#cfcfcf] bg-white p-6 shadow-14">
            <div className="text-text-md">{cardTitle}</div>
            <div className="mt-3 rounded-md border border-[#cfcfcf] p-6 shadow-md">
                <div className="mb-5 text-text-xl">{subCardTitle}</div>
                {children}
            </div>
        </div>
    );
};

export default Card;
