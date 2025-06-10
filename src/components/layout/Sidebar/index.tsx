'use client';

import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

import LogoImage from '@/assets/logo/next.svg';
import SidebarAdmin from '@/components/layout/Sidebar/SidebarAdmin';
import type { Reducers } from '@/redux/types';
import { ButtonIcon } from '@/components/button';

// interface SidebarProps {
//     props.sidebarOpen: boolean;
//     setSidebarOpen?: (arg: boolean) => void;
// }

const Sidebar = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    const authState = useSelector((state: Reducers) => state.auth);
    return (
        <aside
            className={`fixed left-0 top-0 z-9999 flex h-screen ${props.sidebarOpen ? 'w-22' : 'w-72.5'} translate-x-0 flex-col bg-neutral duration-300 ease-linear`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                {!props.sidebarOpen && (
                    <Link href="/">
                        <Image
                            width={props.sidebarOpen ? 32 : 176}
                            height={32}
                            src={LogoImage}
                            alt="Logo"
                            priority
                        />
                    </Link>
                )}
                <ButtonIcon
                    icon={
                        <Icon
                            icon="fluent:navigation-24-regular"
                            width="24"
                            height="24"
                            color="white"
                        />
                    }
                    onClick={(e: any) => {
                        e.stopPropagation();
                        props.setSidebarOpen(!props.sidebarOpen);
                    }}
                />
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 px-4 lg:mt-9">
                    <SidebarAdmin
                        sidebarOpen={props.sidebarOpen}
                        setSidebarOpen={props.setSidebarOpen}
                    />
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
