'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import Pagination from '@/components/Pagination';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/tab/tabs';
import SearchFoodLog from '@/components/ui/food-log/SearchFoodLog';
import ChartsNutrition from '@/components/ui/nutrition/ChartsNutrition';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const LayoutNutrition = () => {
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
                <div className="w-full max-w-full">
                    <Card
                        cardTitle="Nutrition Analytics"
                        subCardTitle="Nutrition Analytics"
                    >
                        <Tabs defaultValue="macro">
                            <TabsList className="mb-4 grid w-full grid-cols-2 bg-primary-light">
                                <TabsTrigger
                                    value="macro"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                                >
                                    Macronutrients
                                </TabsTrigger>
                                <TabsTrigger
                                    value="micro"
                                    className="data-[state=active]:bg-white data-[state=active]:text-primary"
                                >
                                    Micronutrients
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="macro">
                                <ChartsNutrition />
                            </TabsContent>
                            <TabsContent value="micro">
                                Micronutrients
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayoutNutrition;
