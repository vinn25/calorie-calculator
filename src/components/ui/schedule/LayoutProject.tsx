'use client';

import Alert from '@/components/alert/Alert';
import Pagination from '@/components/Pagination';
import FilterProject from '@/components/ui/schedule/FilterProject';
import TableListProject from '@/components/ui/schedule/TableListProject';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LayoutProject = () => {
    const dispatch = useDispatch();
    const projectState = useSelector((state: Reducers) => state.project);
    const [alertMessage, setAlertMessage] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
        active: 'true',
    });
    useEffect(() => {
        if (projectState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'PROJECT_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, projectState.actions?.error, projectState.actions?.type]);

    return (
        <div>
            <div className="container relative mx-auto min-h-screen max-w-full px-8 py-6">
                <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                projectState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                projectState?.actions?.type === 'success'
                                    ? `${projectState?.actions?.message?.data}`
                                    : `${projectState?.actions?.error?.meta?.code} : ${projectState?.actions?.error?.meta?.message}`
                            }
                        />
                    )}
                </div>
                <div className="flex w-full max-w-full justify-stretch">
                    <FilterProject params={params} setParams={setParams} />
                </div>
                <div className="mt-5 min-h-full w-full max-w-full">
                    <TableListProject params={params} />
                </div>
                <div className="fixed bottom-0 left-72.5 right-0 z-999 m-auto h-fit border border-[#EAECF0] bg-neutral-50 px-6 py-3">
                    <Pagination
                        params={params}
                        setParams={setParams}
                        totalPage={
                            projectState?.list?.data?.meta?.pagination
                                ?.totalPage
                        }
                        total={
                            projectState?.list?.data?.meta?.pagination?.total
                        }
                        loading={projectState?.list?.loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default LayoutProject;
