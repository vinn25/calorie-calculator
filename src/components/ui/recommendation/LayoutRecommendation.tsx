'use client';

import Alert from '@/components/alert/Alert';
import Card from '@/components/card/Card';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableListRecommendation from '@/components/ui/recommendation/TableListRecommendation';

const LayoutRecommendation = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const [alertMessage, setAlertMessage] = useState(false);
    // useEffect(() => {
    //     if (userState.actions?.type) {
    //         setAlertMessage(true);
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
                    <TableListRecommendation />
                </div>
            </div>
        </div>
    );
};

export default LayoutRecommendation;
