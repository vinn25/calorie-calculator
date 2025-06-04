'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutFoodLog from '@/components/ui/food-log/LayoutFoodLog';
import LayoutProfile from '@/components/ui/profile/LayoutProfile';

const ProfilePage = () => {
    return (
        <DefaultLayout title="Your Profile">
            <LayoutProfile />
        </DefaultLayout>
    );
};

export default ProfilePage;
