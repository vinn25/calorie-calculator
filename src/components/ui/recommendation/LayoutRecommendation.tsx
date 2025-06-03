'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableListRecommendation from '@/components/ui/recommendation/TableListRecommendation';

const LayoutRecommendation = () => {
    const dispatch = useDispatch();
    const foodState = useSelector((state: Reducers) => state.food);
    const [alertMessage, setAlertMessage] = useState(false);
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

export default LayoutRecommendation;
