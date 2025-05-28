import React from 'react';

interface ProgressBarProps {
    value: number;
    style: 'primary' | 'secondary' | 'accent';
    label?: string;
    showPercentage?: boolean;
    fullWidth?: boolean;
}

const Progress = ({
    value,
    style,
    label,
    showPercentage,
    fullWidth,
}: ProgressBarProps) => {
    const color =
        style === 'primary'
            ? 'bg-primary'
            : style === 'secondary'
              ? 'bg-secondary'
              : 'bg-accent-orange';

    return (
        <div className={`${fullWidth && 'w-full'}`}>
            {label && (
                <div className="mb-1 text-text-sm font-medium text-primary">
                    {label}
                </div>
            )}
            <div className="h-[10px] w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                    className={`h-full rounded-full ${color} transition-all duration-300 ease-in-out`}
                    style={{ width: `${value}%` }}
                />
            </div>
            {showPercentage && (
                <div className="text-gray-600 mt-1 text-right text-sm">
                    {value}%
                </div>
            )}
        </div>
    );
};

export default Progress;
