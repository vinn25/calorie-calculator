import Progress from '@/components/progress/Progress';
import React from 'react';

const MicroNutrition = () => {
    return (
        <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
            <div className="mb-7 grid grid-cols-1 gap-10">
                <Progress
                    current={80}
                    target={200}
                    type="nutrient"
                    style="secondary"
                    label="Vitamin C"
                    fullWidth
                />
                <Progress
                    current={26}
                    target={200}
                    type="nutrient"
                    style="secondary"
                    label="Calcium"
                    fullWidth
                />
                <Progress
                    current={80}
                    target={200}
                    type="nutrient"
                    style="secondary"
                    label="Iron"
                    fullWidth
                />
                <Progress
                    current={80}
                    target={200}
                    type="nutrient"
                    style="secondary"
                    label="Vitamin D"
                    fullWidth
                />
                <Progress
                    current={80}
                    target={200}
                    type="nutrient"
                    style="secondary"
                    label="Potassium"
                    fullWidth
                />
            </div>
        </div>
    );
};

export default MicroNutrition;
