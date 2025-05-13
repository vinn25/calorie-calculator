import React from 'react';
import DefaultLayout from '@/components/layout/DefaultLayout';
import EditProject from '@/components/ui/schedule/edit/LayoutEditProject';

// { params }: { params: { id: string } }
const EditProjectPage = () => {
    return (
        <DefaultLayout title="Edit Project">
            <EditProject />
        </DefaultLayout>
    );
};

export default EditProjectPage;
