'use client';

import React from 'react';
import Progress from '@/components/progress/Progress';

interface Props {
    user: any;
}

const TodayMicroNutrition = ({ user }: Props) => {
    const totals = user?.list?.data?.totals;
    const targets = user?.profile?.data;

    return (
        <>
            <Progress
                current={totals?.vitaminc}
                target={targets?.vitaminCTarget}
                type="nutrient"
                style="secondary"
                label="Vitamin C"
                fullWidth
                unit="mg"
            />
            <Progress
                current={totals?.calcium}
                target={targets?.calciumTarget}
                type="nutrient"
                style="secondary"
                label="Calcium"
                fullWidth
                unit="mg"
            />
            <Progress
                current={totals?.iron}
                target={targets?.ironTarget}
                type="nutrient"
                style="secondary"
                label="Iron"
                fullWidth
                unit="mg"
            />
            <Progress
                current={totals?.vitamind}
                target={targets?.vitaminDTarget}
                type="nutrient"
                style="secondary"
                label="Vitamin D"
                fullWidth
                unit="μg"
            />
            <Progress
                current={totals?.potassium}
                target={targets?.potassiumTarget}
                type="nutrient"
                style="secondary"
                label="Potassium"
                fullWidth
                unit="mg"
            />
        </>
    );
};

export default TodayMicroNutrition;
