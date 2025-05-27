import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBack from '@/components/button/ButtonBack';

import DropdownUser from './DropdownUser';
import { ButtonIcon } from '@/components/button';
import Link from 'next/link';

const Header = (props: {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}) => {
    const [isBack, setIsBack] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const pathname = usePathname();
    useEffect(() => {
        const splitPathname: any = pathname?.split('/');
        if (splitPathname?.length > 2) {
            setIsBack(true);
        }
        // Set the active item based on the current pathname
        const currentActiveItem = navGroups.find(
            item => item.route === pathname
        );
        if (currentActiveItem) {
            setActiveItem(currentActiveItem.id);
        }
    }, [pathname]);

    const isActive = (items: any) => {
        let active = false;

        if (pathname === '/' && items.route === '/') {
            active = true;
        } else if (items.route !== '/' && pathname?.match(items.route)) {
            active = true;
        }

        return active;
    };

    const navGroups = [
        {
            id: 'home',
            label: 'Home',
            route: '/',
        },
        {
            id: 'foodlog',
            label: 'Food Log',
            route: '/foodlog',
        },
        {
            id: 'nutrition',
            label: 'Nutrition',
            route: '/nutrition',
        },
        {
            id: 'recommendation',
            label: 'Recommendations',
            route: '/recommendation',
        },
    ];

    const isItemActive = isActive(navGroups);

    return (
        <header className="sticky top-0 z-999 w-full flex-row bg-white drop-shadow-1 dark:drop-shadow-none">
            <div className="flex grow items-center justify-between border border-b-neutral-300 p-4 md:px-6 2xl:px-11">
                {/* <div className="hidden sm:block" /> shadow-2 */}
                <div className="flex items-center gap-3">
                    {/* <ButtonIcon
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
                    /> */}
                    {isBack && <ButtonBack />}
                    <h4 className="text-text-xl font-semibold text-neutral text-primary">
                        <Link href="/">Calorie Tracker</Link>
                    </h4>
                </div>
                <div className="2xsm:gap-7 flex items-center gap-3">
                    {/* <!-- User Area --> */}
                    <DropdownUser />
                    {/* <!-- User Area --> */}
                </div>
            </div>
            <div className="flex items-center gap-5 rounded-[10px] p-4 md:px-6 2xl:px-11">
                {navGroups.map(items => (
                    <div
                        key={items.id}
                        className={`rounded-md p-1 ${activeItem === items.id ? 'bg-primary text-white' : 'hover:bg-primary-light hover:text-primary-dark'}`}
                        onClick={() => setActiveItem(items.id)} // Set active item on click
                    >
                        <Link href={items.route} className="px-8">
                            {items.label}
                        </Link>
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Header;
