'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutNutrition from '@/components/ui/nutrition/LayoutNutrition';
import LayoutRecommendation from '@/components/ui/recommendation/LayoutRecommendation';

const RecommendationsPage = () => {
    return (
        <DefaultLayout title="NutriTrack">
            <LayoutRecommendation />
        </DefaultLayout>
    );
};

export default RecommendationsPage;
