import DefaultLayout from '@/components/layout/DefaultLayout';
import LayoutCreateProject from '@/components/ui/schedule/create/LayoutCreateProject';
import React from 'react';

const CreateProjectPage = () => {
    return (
        <DefaultLayout title="New Project">
            <LayoutCreateProject />
        </DefaultLayout>
    );
};

export default CreateProjectPage;
