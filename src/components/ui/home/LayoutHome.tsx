'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import { TextField } from '@/components/form';
import Pagination from '@/components/Pagination';
import Progress from '@/components/progress/Progress';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import TableListHome from '@/components/ui/home/TableListHome';
import ChartsNutrition from '@/components/ui/nutrition/ChartsNutrition';
import FilterProject from '@/components/ui/schedule/FilterProject';
import TableListProject from '@/components/ui/schedule/TableListProject';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
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
    const [searchTerm, setSearchTerm] = useState('');
    const projectState = useSelector((state: Reducers) => state.project);
    const [alertMessage, setAlertMessage] = useState(false);
    const [params, setParams] = useState({
        page: 1,
        perPage: 10,
        search: '',
        active: 'true',
    });
    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };
    useEffect(() => {
        if (projectState.actions?.type) {
            setAlertMessage(true);
            setTimeout(() => {
                setAlertMessage(false);
                dispatch<any>({
                    type: 'PROJECT_ACTION_CLEAR',
                });
            }, 4000);
        }
    }, [dispatch, projectState.actions?.error, projectState.actions?.type]);

    return (
        <div>
            <div className="container relative mx-auto max-w-full py-6">
                <div className="fixed left-1/2 top-5 z-999">
                    {alertMessage && (
                        <Alert
                            type={
                                projectState?.actions?.type === 'success'
                                    ? 'success'
                                    : 'error'
                            }
                            text={
                                projectState?.actions?.type === 'success'
                                    ? `${projectState?.actions?.message?.data}`
                                    : `${projectState?.actions?.error?.meta?.code} : ${projectState?.actions?.error?.meta?.message}`
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
                    <SearchFoodLog
                        cardTitle="Quick Add Food"
                        subCardTitle="Food Log Entry"
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        params={params}
                    />
                </div>
                <div className="mt-5">
                    <ChartsNutrition
                        cardTitle="Nutrition Overview"
                        subCardTitle="Nutrition Analytics"
                    />
                </div>
            </div>
        </div>
    );
};

export default LayoutHome;
