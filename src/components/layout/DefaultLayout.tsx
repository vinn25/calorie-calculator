'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import AuthWrapper from '@/components/AuthWrapper';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { getAuthUserProfile } from '@/redux/actions/auth';

export default function DefaultLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    const dispatch = useDispatch();
    const [sidebarOpen, setSidebarOpen] = useState(false);
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
        // <AuthWrapper>
        <div>
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex min-h-screen bg-neutral-50 font-Montserrat">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div
                    className={`relative flex flex-1 flex-col ${sidebarOpen ? 'ml-22' : 'ml-72.5'} duration-300 ease-linear`}
                >
                    {/* <!-- ===== Header Start ===== --> */}
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        title={title}
                    />
                    {/* <!-- ===== Header End ===== --> */}

                    {/* <!-- ===== Main Content Start ===== --> */}
                    <main>
                        <div className="mx-auto max-w-screen-2xl bg-neutral-50 px-6 pb-15 pt-6">
                            {children}
                        </div>
                    </main>
                    {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
            </div>
            {/* <!-- ===== Page Wrapper End ===== --> */}
        </div>
        // </AuthWrapper>
    );
}
