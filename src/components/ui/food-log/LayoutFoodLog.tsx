'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import TableListFood from '@/components/ui/food-log/TableListFood';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/tab/tabs';
import { LoadingSpinner } from '@/components/loading';
import { getUserFavorite, getUserListLog } from '@/redux/actions/user';
import { SelectOptions } from '@/components/form';
import FavoriteListFood from '@/components/ui/food-log/FavoriteListFood';

const filterRange = [
    {
        key: 'today',
        text: 'Today',
        value: '',
    },
    {
        key: 'wekk',
        text: 'Week',
        value: 'week',
    },
    {
        key: 'month',
        text: 'Month',
        value: 'month',
    },
    {
        key: '3month',
        text: '3 Month',
        value: '3months',
    },
    {
        key: '6month',
        text: '6 Month',
        value: '6months',
    },
    {
        key: 'year',
        text: 'Year',
        value: 'year',
    },
    {
        key: 'all',
        text: 'All Time',
        value: 'all',
    },
];

const LayoutFoodLog = () => {
    const [params, setParams] = useState('');
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const [alertMessage, setAlertMessage] = useState(false);
    const [getRange, setGetRange] = useState('');
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    const handleChangeRange = (e: any) => {
        const value = e.target.value;
        setGetRange(value);
    };
    useEffect(() => {
        if (userState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'FOOD_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, userState.actions?.error, userState.actions?.type]);
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id: id, range: getRange }));
        }
        getLogs();
    }, [dispatch, id, getRange]);
    useEffect(() => {
        async function getFavorites() {
            await dispatch<any>(getUserFavorite({ id: id }));
        }
        getFavorites();
    }, [dispatch, id]);

    return (
        <div>
            <div className="container relative mx-auto max-w-full py-6">
                <div className="fixed left-[35%] top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                userState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                userState?.actions?.type === 'success'
                                    ? `${userState?.actions?.message?.data}`
                                    : `${userState?.actions?.error?.meta?.code} : ${userState?.actions?.error?.meta?.message}`
                            }
                        />
                    )}
                </div>
                <div className="w-full max-w-full">
                    <Card
                        cardTitle="Food Log"
                        subCardTitle="Food Log Entry"
                        addOns={
                            <SelectOptions
                                name="range"
                                label=""
                                options={filterRange}
                                selectSize="sm"
                                defaultValue={getRange}
                                onChange={handleChangeRange}
                            />
                        }
                    >
                        <Tabs defaultValue="search">
                            <TabsList className="mb-4 grid w-full grid-cols-3 bg-primary-light">
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
                                <TabsTrigger
                                    value="favorite"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                                >
                                    Favorites
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
                                    ) : userState?.list?.data?.foods &&
                                      userState?.list?.data?.foods.length >
                                          0 ? (
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
                                                                {data?.calories %
                                                                    1 !==
                                                                0
                                                                    ? data.calories.toFixed(
                                                                          1
                                                                      )
                                                                    : data.calories}
                                                            </span>{' '}
                                                            kcal
                                                        </p>
                                                        <p className="text-xs">
                                                            P:{' '}
                                                            <span className="text-secondary">
                                                                {data?.protein %
                                                                    1 !==
                                                                0
                                                                    ? data.protein.toFixed(
                                                                          1
                                                                      )
                                                                    : data.protein}
                                                            </span>
                                                            g | C:{' '}
                                                            <span className="text-secondary">
                                                                {data?.carbs %
                                                                    1 !==
                                                                0
                                                                    ? data.carbs.toFixed(
                                                                          1
                                                                      )
                                                                    : data.carbs}
                                                            </span>
                                                            g | F:{' '}
                                                            <span className="text-secondary">
                                                                {data?.fat %
                                                                    1 !==
                                                                0
                                                                    ? data.fat.toFixed(
                                                                          1
                                                                      )
                                                                    : data.fat}
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
                            <TabsContent value="favorite">
                                <FavoriteListFood />
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayoutFoodLog;
