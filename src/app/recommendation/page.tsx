'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutNutrition from '@/components/ui/nutrition/LayoutNutrition';
import LayoutRecommendation from '@/components/ui/recommendation/LayoutRecommendation';

const RecommendationsPage = () => {
    return (
        <DefaultLayout>
            <LayoutRecommendation />
        </DefaultLayout>
    );
};

export default RecommendationsPage;
