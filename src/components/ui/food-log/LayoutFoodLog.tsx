'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import Pagination from '@/components/Pagination';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import TableListFood from '@/components/ui/food-log/TableListFood';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/tab/tabs';
import { Icon } from '@iconify/react/dist/iconify.js';
import { LoadingSpinner } from '@/components/loading';
import { getUserListLog } from '@/redux/actions/user';

const dailyCalories = [
    {
        title: 'Goal',
        calorie: 2000,
    },
    {
        title: 'Consumed',
        calorie: 1400,
    },
    {
        title: 'Remaining',
        calorie: 600,
    },
];

const LayoutFoodLog = () => {
    const [params, setParams] = useState('');
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const [alertMessage, setAlertMessage] = useState(false);
    const id = authState.profile?.data?.userId;
    useEffect(() => {
        if (foodState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'FOOD_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, foodState.actions?.error, foodState.actions?.type]);
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id }));
        }
        getLogs();
    }, [dispatch, id]);

    return (
        <div>
            <div className="container relative mx-auto max-w-full py-6">
                <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                foodState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                foodState?.actions?.type === 'success'
                                    ? `${foodState?.actions?.message?.data}`
                                    : `${foodState?.actions?.error?.meta?.code} : ${foodState?.actions?.error?.meta?.message}`
                            }
                        />
                    )}
                </div>
                <div className="w-full max-w-full">
                    <Card
                        cardTitle="Food Log"
                        subCardTitle="Food Log Entry"
                        addOns={
                            <div className="flex items-center gap-2 rounded-md border border-primary px-2 py-[2px]">
                                <div>
                                    <Icon
                                        icon="fluent:clock-16-regular"
                                        width="16"
                                        height="16"
                                    />
                                </div>
                                <div className="text-text-md">Today</div>
                            </div>
                        }
                    >
                        <Tabs defaultValue="search">
                            <TabsList className="mb-4 grid w-full grid-cols-2 bg-primary-light">
                                <TabsTrigger
                                    value="search"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                                >
                                    Search Foods
                                </TabsTrigger>
                                <TabsTrigger
                                    value="recent"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                                >
                                    Recent Foods
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="search">
                                <SearchFoodLog
                                    params={params}
                                    setParams={setParams}
                                />
                                <div className="mt-5 min-h-full w-full max-w-full">
                                    {params && (
                                        <TableListFood params={params} />
                                    )}
                                </div>
                            </TabsContent>
                            <TabsContent value="recent">
                                <div className="max-h-60 overflow-y-auto rounded-md border border-[#cfcfcf]">
                                    {userState?.list?.loading ? (
                                        <li className="flex cursor-pointer items-center justify-center p-3 hover:bg-muted">
                                            <LoadingSpinner />
                                        </li>
                                    ) : userState?.list?.data?.foods ? (
                                        userState?.list?.data?.foods.map(
                                            (data: any) => (
                                                <li
                                                    key={data.foodId}
                                                    className="flex cursor-pointer items-center justify-between p-3 hover:bg-muted"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {data.name}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">
                                                            <span className="text-secondary">
                                                                {data.calories}
                                                            </span>{' '}
                                                            kcal
                                                        </p>
                                                        <p className="text-xs">
                                                            P:{' '}
                                                            <span className="text-secondary">
                                                                {data.protein}
                                                            </span>
                                                            g | C:{' '}
                                                            <span className="text-secondary">
                                                                {
                                                                    data.carbohydrates
                                                                }
                                                            </span>
                                                            g | F:{' '}
                                                            <span className="text-secondary">
                                                                {data.fat}
                                                            </span>
                                                            g
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <div className="p-4 text-center text-muted-foreground">
                                            No foods found.
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayoutFoodLog;
