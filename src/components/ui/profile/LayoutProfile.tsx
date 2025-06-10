'use client';

import Alert from '@/components/alert/Alert';
import { Reducers } from '@/redux/types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/tab/tabs';
import PersonalInformationProfile from '@/components/ui/profile/PersonalInformationProfile';

const LayoutProfile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const [alertMessage, setAlertMessage] = useState(false);
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
    return (
        <div>
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
            <div className="container mx-auto max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                <PersonalInformationProfile />
            </div>
            {/* <Tabs defaultValue="personal">
                <TabsList className="mx-auto mb-4 grid max-w-[850px] grid-cols-2 bg-primary-light">
                    <TabsTrigger
                        value="personal"
                        className="data-[state=active]:bg-white data-[state=active]:text-primary"
                    >
                        Personal Info
                    </TabsTrigger>
                    <TabsTrigger
                        value="calorie"
                        className="data-[state=active]:bg-white data-[state=active]:text-primary"
                    >
                        Caloric Target
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                    <PersonalInformationProfile />
                </TabsContent>
                <TabsContent value="calorie">
                    <div className="container mx-auto max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                        Calorie Target
                    </div>
                </TabsContent>
            </Tabs> */}
        </div>
    );
};

export default LayoutProfile;
