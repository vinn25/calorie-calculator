'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import Progress from '@/components/progress/Progress';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import TableListFood from '@/components/ui/food-log/TableListFood';
import ChartsNutrition from '@/components/ui/nutrition/ChartsNutrition';
import TableListRecommendation from '@/components/ui/recommendation/TableListRecommendation';
import { getSuggestions } from '@/redux/actions/suggest';
import { getUserListLog, getUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { parseJwt } from '@/utils/jwt';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const LayoutHome = () => {
    const dispatch = useDispatch();
    // const foodState = useSelector((state: Reducers) => state.food);
    const [getRange, setGetRange] = useState<string>('today');
    const userState = useSelector((state: Reducers) => state.user);
    const suggestState = useSelector((state: Reducers) => state.suggest);
    const authState = useSelector((state: Reducers) => state.auth);
    // const [alertMessage, setAlertMessage] = useState(false);
    const [params, setParams] = useState('');
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    useEffect(() => {
        const token = authState?.token?.accessToken;
        if (!token) return;
        const payload = parseJwt(token);
        if (!payload || !payload.exp) {
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login';
            return;
        }
        const isExpired = Date.now() > payload.exp * 1000;
        if (isExpired) {
            dispatch({ type: 'LOGOUT' });
            window.location.href = '/login';
        }
    }, [authState.token?.accessToken, dispatch]);
    // useEffect(() => {
    //     if (foodState.actions?.type) {
    //         setAlertMessage(true);
    //         setTimeout(() => {
    //             setAlertMessage(false);
    //             dispatch<any>({
    //                 type: 'food_ACTION_CLEAR',
    //             });
    //         }, 4000);
    //     }
    // }, [dispatch, foodState.actions?.error, foodState.actions?.type]);
    useEffect(() => {
        async function getProfile() {
            await dispatch<any>(getUserProfile({ id: id }));
        }
        getProfile();
    }, [dispatch, id]);
    useEffect(() => {
        async function getSuggestRemaining() {
            await dispatch<any>(getSuggestions({ id: id }));
        }
        getSuggestRemaining();
    }, [dispatch, id]);
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id: id, range: '' }));
        }
        getLogs();
    }, [dispatch, id]);

    return (
        <div>
            <div className="container relative mx-auto max-w-full py-6">
                {/* <div className="fixed left-[35%] top-5 z-999">
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
                </div> */}
                <div className="grid grid-cols-2 gap-4">
                    <Card
                        cardTitle="Daily Summary"
                        subCardTitle="Daily Calories"
                    >
                        <div className="grid grid-cols-3 items-center">
                            <div className="pl-[40px] text-left">
                                <div>Goal</div>
                                <div className="text-text-lg font-semibold text-secondary">
                                    {userState?.profile?.data?.calorieTarget}
                                </div>
                            </div>
                            <div className="text-center">
                                <div>Consumed</div>
                                <div className="text-text-lg font-semibold text-secondary">
                                    {userState?.list?.data?.totals?.calories}
                                </div>
                            </div>
                            <div className="pr-[40px] text-right">
                                <div>Remaining</div>
                                <div className="text-text-lg font-semibold text-secondary">
                                    {
                                        suggestState?.list?.data?.remaining
                                            ?.calories
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Progress
                                current={
                                    userState?.list?.data?.totals?.calories
                                }
                                target={userState?.profile?.data?.calorieTarget}
                                type="calorie"
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
                        <ChartsNutrition getRange={getRange} />
                    </Card>
                </div>
                <div className="mt-5">
                    <TableListRecommendation />
                </div>
            </div>
        </div>
    );
};

export default LayoutHome;
