import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBack from '@/components/button/ButtonBack';

import DropdownUser from './DropdownUser';
import { ButtonIcon } from '@/components/button';

const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
    title: string;
}) => {
    const [isBack, setIsBack] = useState(false);
    const pathname = usePathname();
    useEffect(() => {
        const splitPathname = pathname?.split('/');
        if (splitPathname?.length > 2) {
            setIsBack(true);
        }
    }, [pathname]);

    return (
        <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:drop-shadow-none">
            <div className="flex grow items-center justify-between p-4 shadow-2 md:px-6 2xl:px-11">
                {/* <div className="hidden sm:block" /> */}
                <div className="flex items-center gap-3">
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
                    {isBack && <ButtonBack />}
                    <h4 className="text-neutral text-text-xl font-semibold">
                        {props.title}
                    </h4>
                </div>
                <div className="2xsm:gap-7 flex items-center gap-3">
                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
