'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutFoodLog from '@/components/ui/food-log/LayoutFoodLog';

const FoodLogPage = () => {
    return (
        <DefaultLayout title="Schedule">
            <LayoutFoodLog />
        </DefaultLayout>
    );
};

export default FoodLogPage;
