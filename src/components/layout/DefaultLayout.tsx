'use client';

import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import AuthWrapper from '@/components/AuthWrapper';
import Header from '@/components/layout/Header';
import { getAuthUserProfile } from '@/redux/actions/auth';

const gaps = [
    {
        nutrient: 'Calorie: ',
    },
    {
        nutrient: 'Protein: ',
    },
    {
        nutrient: 'Fat: ',
    },
    {
        nutrient: 'Carbohydrate: ',
    },
];

export default function DefaultLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    const dispatch = useDispatch();
    const effectRun = useRef(false);
    // const userProfile = useCallback(() => {
    //     dispatch<any>(getAuthUserProfile({ callback: 'success' }));
    // }, [dispatch]);
    useEffect(() => {
        if (effectRun.current === false) {
            dispatch<any>(
                getAuthUserProfile({
                    callback: () => {
                        effectRun.current = true;
                    },
                })
            );
        }
    }, [dispatch]);

    return (
        <AuthWrapper>
            <div>
                {/* <!-- ===== Page Wrapper Start ===== --> */}
                <div className="flex min-h-screen bg-neutral-50 font-Montserrat">
                    {/* <!-- ===== Content Area Start ===== --> ${sidebarOpen ? 'ml-22' : 'ml-72.5'} ease-linear */}
                    <div
                        className={`relative flex flex-1 flex-col duration-300`}
                    >
                        {/* <!-- ===== Header Start ===== --> */}
                        <Header title={title} />
                        {/* <!-- ===== Header End ===== --> */}

                        {/* <!-- ===== Main Content Start ===== --> */}
                        <main>
                            <div className="mx-auto max-w-screen-2xl bg-neutral-50 px-6 pb-15 pt-6">
                                {/* <div className="flex gap-2">
                                    {userState?.gap?.data?.alerts ? (
                                        userState?.gap?.data?.alerts.map(
                                            (data: any) => (
                                                <div className="rounded-[12px] border border-accent-red bg-[#FEF4F4] p-6 text-accent-red">
                                                    {data}
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div />
                                    )}
                                </div> */}
                                {children}
                            </div>
                        </main>
                        {/* <!-- ===== Main Content End ===== --> */}
                    </div>
                    {/* <!-- ===== Content Area End ===== --> */}
                </div>
                {/* <!-- ===== Page Wrapper End ===== --> */}
            </div>
        </AuthWrapper>
    );
}
