import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SidebarItemCollapse = ({ item, pageName, setPageName }: any) => {
    const handleClick = () => {
        const updatedPageName =
            pageName !== item.label.toLowerCase()
                ? item.label.toLowerCase()
                : '';
        return setPageName(updatedPageName);
    };

    const pathname = usePathname();

    const isActive = (items: any) => {
        if (items.route === pathname) return true;
        if (items.children) {
            return items.children.some((child: any) => isActive(child));
        }
        return false;
    };

    const isItemActive = isActive(item);

    return (
        <li className="rounded-lg hover:bg-slate-300/20">
            {/* <Tooltip
                content={item.label}
                withArrow
                positioning="after"
                relationship="label"
            > */}
            <Link
                href={item.route}
                onClick={handleClick}
                className={`${isItemActive ? 'bg-slate-300/20 text-slate-300' : ''} group relative flex items-center gap-2.5 rounded-lg px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:text-slate-300`}
            >
                {item.icon}
            </Link>
            {/* </Tooltip> */}
        </li>
    );
};

export default SidebarItemCollapse;
