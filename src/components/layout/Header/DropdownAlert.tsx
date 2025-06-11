import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ClickOutside from '@/components/ClickOutside';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '@/redux/types';
import { getUserGap } from '@/redux/actions/user';

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

const DropdownAlert = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);
    useEffect(() => {
        async function getGap() {
            await dispatch<any>(getUserGap({ id: id }));
        }
        getGap();
    }, [dispatch, id]);
    // const gapLenght = userState?.gap?.data?.alerts.length;

    return (
        <ClickOutside
            onClick={() => setDropdownOpen(false)}
            // className="relative"
        >
            <div className="relative">
                <div
                    onClick={() => {
                        setNotifying(false);
                        setDropdownOpen(!dropdownOpen);
                    }}
                    className="border-stroke bg-gray dark:border-strokedark dark:bg-meta-4 relative flex size-8.5 items-center justify-center rounded-full border-[0.5px] hover:cursor-pointer hover:text-slate-600 dark:text-white"
                >
                    <Icon
                        icon="fluent:alert-20-regular"
                        width="20"
                        height="20"
                        color="#04BB00"
                    />
                    {/* {gapLenght > 0 && ( */}
                    <div className="absolute -right-2 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-red p-0 text-xs text-white">
                        4
                    </div>
                    {/* )} */}
                </div>

                {/* <!-- Dropdown Start --> */}
                {dropdownOpen && (
                    <div className="border-stroke dark:border-strokedark dark:bg-boxdark absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border bg-white shadow-default sm:right-0 sm:w-80">
                        <div className="border border-b-body px-4.5 py-3">
                            <h5 className="flex items-center gap-2 text-sm font-medium text-bodydark2">
                                Alerts
                                <span className="rounded-md bg-accent-red px-[6px] py-[1.5px] text-white">
                                    {/* {gapLenght} */}4
                                </span>
                            </h5>
                        </div>

                        <ul className="flex h-auto flex-col overflow-y-auto">
                            <li>
                                {userState?.gap?.data?.alerts ? (
                                    userState?.gap?.data?.alerts.map(
                                        (data: any, index: any) => {
                                            const alert = data;
                                            const nutrientName = alert
                                                ? alert
                                                      .toLowerCase()
                                                      .split(' ')[0]
                                                : '';
                                            const current =
                                                userState?.gap?.data?.totals;
                                            const target =
                                                userState?.gap?.data?.targets;
                                            return (
                                                <div
                                                    key={index}
                                                    className="m-2 rounded-[12px] border border-accent-red bg-[#FEF4F4] p-3 text-black"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Icon
                                                            icon="fluent:warning-16-regular"
                                                            width="16"
                                                            height="16"
                                                            color="#F44336"
                                                        />
                                                        <span className="text-text-sm">
                                                            {alert}
                                                        </span>
                                                    </div>
                                                    {nutrientName ===
                                                        'calories' &&
                                                    userState?.gap?.data?.totals
                                                        ?.calories <
                                                        userState?.gap?.data
                                                            ?.targets
                                                            ?.calorieTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve only
                                                            consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.calories %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.calories).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.calories}
                                                            kcal of{' '}
                                                            {nutrientName} (
                                                            {(
                                                                (current?.calories /
                                                                    target?.calorieTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adding more{' '}
                                                            {nutrientName}-dense
                                                            foods to help meet
                                                            your nutritional
                                                            needs.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'calories' &&
                                                      userState?.gap?.data
                                                          ?.totals?.calories >
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.calorieTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.calories %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.calories).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.calories}
                                                            kcal of{' '}
                                                            {nutrientName} (
                                                            {(
                                                                (current?.calories /
                                                                    target?.calorieTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adjusting
                                                            your portions for a
                                                            balanced intake.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'protein' &&
                                                      userState?.gap?.data
                                                          ?.totals?.protein <
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.proteinTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve only
                                                            consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.protein %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.protein).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.protein}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.protein /
                                                                    target?.proteinTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adding{' '}
                                                            {nutrientName}
                                                            -rich foods.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'protein' &&
                                                      userState?.gap?.data
                                                          ?.totals?.protein >
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.proteinTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.protein %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.protein).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.protein}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.protein /
                                                                    target?.proteinTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adjusting
                                                            your portions for a
                                                            balanced intake.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'fat' &&
                                                      userState?.gap?.data
                                                          ?.totals?.fat <
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.fatTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve only
                                                            consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.fat %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.fat).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.fat}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.fat /
                                                                    target?.fatTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adding{' '}
                                                            {nutrientName}
                                                            -rich foods.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'fat' &&
                                                      userState?.gap?.data
                                                          ?.totals?.fat >
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.fatTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.fat %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.fat).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.fat}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.fat /
                                                                    target?.fatTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adjusting
                                                            your portions for a
                                                            balanced intake.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'carbohydrates' &&
                                                      userState?.gap?.data
                                                          ?.totals?.carbs <
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.carbTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve only
                                                            consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.carbs %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.carbs).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.carbs}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.carbs /
                                                                    target?.carbTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adding{' '}
                                                            {nutrientName}
                                                            -rich foods.
                                                        </span>
                                                    ) : nutrientName ===
                                                          'carbohydrates' &&
                                                      userState?.gap?.data
                                                          ?.totals?.carbs >
                                                          userState?.gap?.data
                                                              ?.targets
                                                              ?.carbTarget ? (
                                                        <span className="text-text-xs">
                                                            You&apos;ve consumed{' '}
                                                            {userState?.gap
                                                                ?.data?.totals
                                                                ?.carbs %
                                                                1 !==
                                                            0
                                                                ? (userState?.gap?.data?.totals?.carbs).toFixed(
                                                                      2
                                                                  )
                                                                : userState?.gap
                                                                      ?.data
                                                                      ?.totals
                                                                      ?.carbs}
                                                            g of {nutrientName}{' '}
                                                            (
                                                            {(
                                                                (current?.carbs /
                                                                    target?.carbTarget) *
                                                                100
                                                            ).toFixed(0)}
                                                            % of target).
                                                            Consider adjusting
                                                            your portions for a
                                                            balanced intake.
                                                        </span>
                                                    ) : (
                                                        ' '
                                                    )}
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div>No Alerts</div>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
                {/* <!-- Dropdown End --> */}
            </div>
        </ClickOutside>
    );
};

export default DropdownAlert;
