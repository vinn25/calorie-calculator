'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import { SelectOptions } from '@/components/form';
import Progress from '@/components/progress/Progress';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/tab/tabs';
import ChartsNutrition from '@/components/ui/nutrition/ChartsNutrition';
import MicroNutrition from '@/components/ui/nutrition/MicroNutrition';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const filterRange = [
    {
        key: 'today',
        text: 'Today',
        value: 'today',
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

const LayoutNutrition = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const [alertMessage, setAlertMessage] = useState(false);
    const [getRange, setGetRange] = useState<string>('today');
    const handleChangeRange = (e: any) => {
        const value = e.target.value;
        setGetRange(value);
        console.log(value);
    };
    const handleAlertMessage = () => {
        setAlertMessage(!alertMessage);
    };
    // useEffect(() => {
    //     if (userState.actions?.type) {
    //         setAlertMessage(true);
    //         // handleAlertMessage();
    //         setTimeout(() => {
    //             setAlertMessage(false);
    //             dispatch<any>({
    //                 type: 'FOOD_ACTION_CLEAR',
    //             });
    //         }, 4000);
    //     }
    // }, [dispatch, userState.actions?.error, userState.actions?.type]);

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
                <div className="w-full max-w-full">
                    <Card
                        cardTitle="Nutrition Analytics"
                        subCardTitle="Nutrition Analytics"
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
                                <ChartsNutrition getRange={getRange} />
                            </TabsContent>
                            <TabsContent value="micro">
                                <MicroNutrition getRange={getRange} />
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LayoutNutrition;
