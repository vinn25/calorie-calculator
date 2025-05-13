'use client';

import Pagination from '@/components/Pagination';
import FilterRespondent from '@/components/ui/analysis/FilterRespondent';
import TableListRespondent from '@/components/ui/analysis/TableListRespondent';
import React, { useState } from 'react';

const LayoutRespondent = () => {
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
        department: '',
    });

    return (
        <div>
            <div className="container relative mx-auto min-h-screen max-w-full px-8 py-6">
                {/* <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                userState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={`${userState?.actions?.message?.data}`}
                        />
                    )}
                </div> */}
                <div className="flex w-full max-w-full justify-stretch">
                    <FilterRespondent params={params} setParams={setParams} />
                </div>
                <div className="mt-5 min-h-full w-full max-w-full">
                    <TableListRespondent />
                </div>
                <div className="fixed bottom-0 left-72.5 right-0 z-999 m-auto h-fit border border-[#EAECF0] bg-neutral-50 px-6 py-3">
                    <Pagination
                        params={params}
                        setParams={setParams}
                        totalPage={
                            // userState?.list?.data?._metadata?.pagination?.totalPage
                            50
                        }
                        total={
                            // userState?.list?.data?._metadata?.pagination?.total
                            10
                        }
                        // loading={userState?.list?.loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default LayoutRespondent;
