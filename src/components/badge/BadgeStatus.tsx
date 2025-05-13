import React from 'react';

interface Props {
    isActive: boolean;
}

const BadgeStatus = ({ isActive }: Props) => {
    const badgeColor =
        isActive === true
            ? 'bg-success-50 text-success-700'
            : // : 'bg-[#F2F4F7] text-[#344054]';
              'bg-[#FEF3F2] text-[#B42318]';

    return (
        <span
            className={`rounded-[16px] px-[10px] py-[2px] text-center ${badgeColor}`}
        >
            {isActive === true ? 'ACTIVE' : 'INACTIVE'}
        </span>
    );
};

export default BadgeStatus;
