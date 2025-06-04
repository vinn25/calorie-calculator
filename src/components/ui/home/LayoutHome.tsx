'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import Progress from '@/components/progress/Progress';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import TableListFood from '@/components/ui/food-log/TableListFood';
import ChartsNutrition from '@/components/ui/nutrition/ChartsNutrition';
import TableListRecommendation from '@/components/ui/recommendation/TableListRecommendation';
import reducers from '@/redux/reducers';
import { Reducers } from '@/redux/types';
import { parseJwt } from '@/utils/jwt';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Redirect } from 'next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const dailyCalories = [
    {
        key: 'goal',
        title: 'Goal',
        calorie: 2000,
    },
    {
        key: 'consumed',
        title: 'Consumed',
        calorie: 1400,
    },
    {
        key: 'remaining',
        title: 'Remaining',
        calorie: 600,
    },
];

const LayoutHome = () => {
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    const user = useSelector((state: Reducers) => state.auth)
    console.log(user.profile?.data?.userId)
    const [alertMessage, setAlertMessage] = useState(false);
    const [params, setParams] = useState('');

    useEffect(() => {
        const token = user?.token?.accessToken;
        if (!token) return;

        const payload = parseJwt(token);
        if (!payload || !payload.exp) {
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login'
            return;
        }

        const isExpired = Date.now() > payload.exp * 1000;
        if (isExpired) {
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login'
        }
    }, [user.token?.accessToken, dispatch]);


    useEffect(() => {
        if (foodState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'PROJECT_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, foodState.actions?.error, foodState.actions?.type]);

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
                <div className="grid grid-cols-2 gap-4">
                    <Card
                        cardTitle="Daily Summary"
                        subCardTitle="Daily Calories"
                    >
                        <div className="flex items-center justify-between">
                            {dailyCalories.map(data => (
                                <div key={data.key} className="text-center">
                                    <div>{data.title}</div>
                                    <div className="text-text-lg font-semibold text-secondary">
                                        {data.calorie}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Progress
                                value={70}
                                style="primary"
                                fullWidth
                                label="Daily Progress"
                                showPercentage
                            />
                        </div>
                    </Card>
                    <Card
                        cardTitle="Quick Add Food"
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
                        <SearchFoodLog
                            params={params}
                            setParams={setParams}
                            // searchTerm={searchTerm}
                            // setSearchTerm={setSearchTerm}
                        />
                        <div className="mt-5 min-h-full w-full max-w-full">
                            {params && (
                                <TableListFood
                                    params={params}
                                    // searchTerm={searchTerm}
                                    // setSearchTerm={setSearchTerm}
                                />
                            )}
                        </div>
                    </Card>
                </div>
                <div className="mt-5">
                    <Card
                        cardTitle="Nutrition Analytics"
                        subCardTitle="Nutrition Analytics"
                    >
                        <ChartsNutrition />
                    </Card>
                </div>
                <div className="mt-5">
                    <Card
                        cardTitle="Personalized Recommendations"
                        subCardTitle="Meal Suggestions"
                        addOns={
                            <div className="text-text-md">
                                600 calories remaining
                            </div>
                        }
                    >
                        <TableListRecommendation />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayoutHome;
