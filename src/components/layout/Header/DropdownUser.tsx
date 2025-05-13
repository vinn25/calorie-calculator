import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@/components/badge/Avatar';
import ClickOutside from '@/components/ClickOutside';
import { logoutUser } from '@/redux/actions/auth';
import type { Reducers } from '@/redux/types';
import { LoadingSpinner } from '@/components/loading';

const DropdownUser = () => {
    const dispatch = useDispatch();
    const authState = useSelector((state: Reducers) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <ClickOutside
            onClick={() => setDropdownOpen(false)}
            className="relative"
        >
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-4"
                type="button"
            >
                <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-neutral-50 px-10 py-3 font-sans text-xs font-bold uppercase text-black">
                    <div className="absolute bottom-0 left-1.5 top-2 m-auto size-5 -translate-y-2/4">
                        {/* {authState.profile.loading ? (
                            <LoadingSpinner />
                        ) : (
                            <Avatar
                                name={authState?.profile?.data?.data?.name}
                                type={
                                    authState?.profile?.data?.data?.photo
                                        ? 'image'
                                        : 'text'
                                }
                                image={
                                    authState?.profile?.data?.data?.photo &&
                                    authState?.profile?.data?.data?.photo
                                        ?.completedUrl
                                }
                                size="sm"
                            />
                        )} */}
                        <Avatar size="sm" type="image" />
                    </div>
                    <span className="ml-[18px] text-text-sm font-semibold">
                        {/* {authState.profile.loading ? (
                            <LoadingSpinner />
                        ) : (
                            authState?.profile?.data?.data?.name
                        )} */}
                        John Doe
                    </span>
                    <svg
                        className="absolute inset-y-0 right-3 m-auto fill-current text-neutral-400"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                            fill=""
                        />
                    </svg>
                </div>
            </button>

            {/* <!-- Dropdown Start --> */}
            {dropdownOpen && (
                <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-b-xl border border-stroke bg-white shadow-default">
                    <ul className="flex flex-col border-b border-stroke">
                        <li className="hover:bg-neutral-100">
                            <Link
                                href="/"
                                className="text-neutral flex items-center gap-4 px-[14px] py-[10px] text-text-xs font-medium duration-300 ease-in-out"
                            >
                                {/* <Person16Regular /> */}
                                <Icon
                                    icon="fluent:person-16-regular"
                                    width="16"
                                    height="16"
                                />
                                My Profile
                            </Link>
                        </li>
                        <li className="hover:bg-neutral-100">
                            <Link
                                onClick={() => {
                                    dispatch<any>(logoutUser());
                                }}
                                href="/login"
                                className="flex items-center gap-4 px-[14px] py-[10px] text-text-xs font-medium text-danger-600 duration-300 ease-in-out"
                                type="button"
                            >
                                {/* <Delete16Regular /> */}
                                <Icon
                                    icon="fluent:delete-16-regular"
                                    width="16"
                                    height="16"
                                />
                                Sign Out
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};

export default DropdownUser;
