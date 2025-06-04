import React from 'react';

interface ProgressBarProps {
    current: number;
    target: number;
    style: 'primary' | 'secondary' | 'accent';
    type: 'calorie' | 'nutrient';
    label?: string;
    showPercentage?: boolean;
    fullWidth?: boolean;
}

const Progress = ({
    current,
    target,
    type,
    style,
    label,
    showPercentage,
    fullWidth,
}: ProgressBarProps) => {
    const value = target > 0 ? (current / target) * 100 : 0;
    const color =
        style === 'primary'
            ? 'bg-primary'
            : style === 'secondary'
              ? 'bg-secondary'
              : 'bg-accent-orange';

    return (
        <div className={`${fullWidth && 'w-full'}`}>
            {label && (
                <div className="mb-1 flex justify-between text-text-sm font-medium text-primary">
                    <span>{label}</span>
                    {type === 'nutrient' && (
                        <span>
                            {current} / {target}
                        </span>
                    )}
                </div>
            )}
            <div className="h-[10px] w-full overflow-hidden rounded-full bg-neutral-200">
                <div
                    className={`h-full rounded-full ${color} transition-all duration-300 ease-in-out`}
                    style={{ width: `${value}%` }}
                />
            </div>
            {showPercentage && type === 'calorie' && (
                <div className="mt-1 text-right text-sm text-gray-600">
                    ({value.toFixed(0)}%)
                </div>
            )}
        </div>
    );
};

export default Progress;
