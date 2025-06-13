import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

interface ProgressBarProps {
    current: number;
    target: number;
    style: 'primary' | 'secondary' | 'accent';
    type: 'calorie' | 'nutrient';
    label?: string;
    showPercentage?: boolean;
    fullWidth?: boolean;
    unit?: string
}

const Progress = ({
    current,
    target,
    type,
    style,
    label,
    showPercentage,
    fullWidth,
    unit = 'g'
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
                    {/* <span className="flex items-center gap-1">
                        <span>{label}</span>
                        <span>
                            <Icon
                                icon="fluent:info-16-regular"
                                width="16"
                                height="16"
                                color="#2196F3"
                                className="hover:cursor-pointer"
                            />
                        </span>
                    </span> */}
                    {type === 'nutrient' && (
                        <span>
                            {current} {unit} / {target} {unit}
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
