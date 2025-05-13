import React from 'react';

interface Props {
    icon: any;
    onClick?: any;
}

const ButtonIcon = ({ icon, onClick }: Props) => {
    return (
        <button
            className="flex gap-2 border-transparent bg-transparent text-slate-600"
            type="button"
            onClick={onClick}
            aria-label="button-icon"
        >
            {icon}
        </button>
    );
};

export default ButtonIcon;
