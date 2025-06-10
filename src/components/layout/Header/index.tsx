import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import ButtonBack from '@/components/button/ButtonBack';

import DropdownUser from './DropdownUser';
import Link from 'next/link';
import DropdownAlert from '@/components/layout/Header/DropdownAlert';

const Header = ({ title }: { title: string }) => {
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
        // {
        //     id: 'favourites',
        //     label: 'Favourites',
        //     route: '/favourites',
        // },
    ];

    const [isBack, setIsBack] = useState(false);
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const pathname = usePathname();
    useEffect(() => {
        const splitPathname: any = pathname?.split('/');
        if (splitPathname[1] === 'profile') {
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
                    <h4 className="text-neutral text-text-xl font-semibold text-primary">
                        <Link href="/">{title}</Link>
                    </h4>
                </div>
                {!isBack && (
                    <div className="2xsm:gap-7 flex items-center gap-3">
                        {/* <!-- User Area --> */}
                        <DropdownAlert />
                        <DropdownUser />
                        {/* <!-- User Area --> */}
                    </div>
                )}
            </div>
            {!isBack && (
                <div className="flex items-center gap-5 rounded-[10px] p-4 md:px-6 2xl:px-11">
                    {navGroups.map(items => (
                        <Link
                            key={items.id}
                            href={items.route}
                            className={`rounded-md p-1 ${activeItem === items.id ? 'bg-primary text-white' : 'hover:bg-primary-light hover:text-primary-dark'}`}
                            onClick={() => setActiveItem(items.id)}
                        >
                            <div className="px-8">{items.label}</div>
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;
