'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutNutrition from '@/components/ui/nutrition/LayoutNutrition';

const NutritionPage = () => {
    return (
        <DefaultLayout title="NutriTrack">
            <LayoutNutrition />
        </DefaultLayout>
    );
};

export default NutritionPage;
