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
import { DialogContent } from '@/components/dialog';
import { Buttons } from '@/components/button';
import Avatar from '@/components/badge/Avatar';
import { getUserProfile } from '@/redux/actions/user';
import { getUserName } from '@/helpers/getUserName';
import getBmr from '@/helpers/getBmr';

const LayoutProfile = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const [alertMessage, setAlertMessage] = useState(false);
    const [openEditProfile, setOpenEditProfile] = useState(false);
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    const handleOpenEditProfile = () => {
        setOpenEditProfile(!openEditProfile);
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
        async function getProfile() {
            await dispatch<any>(getUserProfile({ id: id }));
        }
        getProfile();
    }, [dispatch, id]);
    return (
        <div>
            <DialogContent
                title="Update your personal details and physical measurements"
                isOpen={openEditProfile}
                onClose={handleOpenEditProfile}
                onClickOutside={handleOpenEditProfile}
            >
                <PersonalInformationProfile id={id} />
            </DialogContent>
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
            <div>
                {/* -- Profile Header -- */}
                <div className="container mx-auto mb-5 max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                    <div className="flex gap-4">
                        <div className="">
                            {/* {userState.profile.loading ? (
                                <LoadingSpinner />
                            ) : (
                                <Avatar
                                    name={userState?.profile?.data?.email}
                                    type="text"
                                    size="sm"
                                />
                            )} */}
                            <Avatar name="nivek" type="text" size="lg" />
                        </div>
                        <div>
                            <h1 className="mb-2 text-title-sm font-semibold">
                                {getUserName(userState?.profile?.data.email)}
                            </h1>
                            <div className="mb-2 text-text-sm">
                                {userState?.profile?.data?.email}
                            </div>
                            <div>
                                <Buttons
                                    color="primary"
                                    size="md"
                                    text="Edit Profile"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => {
                                        handleOpenEditProfile();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* -- Profile Info -- */}
                <div className="mx-auto mb-5 grid max-w-[850px] grid-cols-2 gap-6">
                    {/* -- Personal -- */}
                    <div className="flex flex-col justify-between rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                        <div className="mb-3 text-text-md font-semibold">
                            Personal Information
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="text-text-sm text-muted-foreground">
                                    Age
                                </div>
                                <div className="mb-2 text-text-md font-semibold">
                                    {userState?.profile?.data?.age} years
                                </div>
                            </div>
                            <div>
                                <div className="text-text-sm text-muted-foreground">
                                    Gender
                                </div>
                                <div className="mb-2 text-text-md font-semibold">
                                    {userState?.profile?.data?.gender}
                                </div>
                            </div>
                            <div>
                                <div className="text-text-sm text-muted-foreground">
                                    Height
                                </div>
                                <div className="mb-2 text-text-md font-semibold">
                                    {userState?.profile?.data?.height} cm
                                </div>
                            </div>
                            <div>
                                <div className="text-text-sm text-muted-foreground">
                                    Weight
                                </div>
                                <div className="mb-2 text-text-md font-semibold">
                                    {userState?.profile?.data?.weight} kg
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* -- Activity -- */}
                    <div className="rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                        <div className="mb-3 text-text-md font-semibold">
                            Activity & Goals
                        </div>
                        <div className="mb-3">
                            <div className="mb-2 text-text-sm text-muted-foreground">
                                Activity Level
                            </div>
                            <div className="w-fit rounded-md bg-secondary px-3 py-[2px] text-text-md font-semibold text-white">
                                {userState?.profile?.data?.activity ===
                                'sedentary'
                                    ? 'Sedentary (little/no exercise)'
                                    : userState?.profile?.data?.activity ===
                                        'light'
                                      ? 'Light (exercise 1-3 times/week)'
                                      : userState?.profile?.data?.activity ===
                                          'moderate'
                                        ? 'Moderate (exercise 3-5 times/week)'
                                        : userState?.profile?.data?.activity ===
                                            'active'
                                          ? 'Very Active (hard exercise 6-7 times/week)'
                                          : 'Extra Active (very hard exercise + phyisical job)'}
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 text-text-sm text-muted-foreground">
                                Daily Calorie Target
                            </div>
                            <div className="text-text-xxl font-semibold text-primary">
                                {userState?.profile?.data?.calorieTarget} kcal
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* -- Profile BMR -- */}
            <div className="container mx-auto mb-5 max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                <div className="mb-5 text-text-md font-semibold">
                    Basal Metabolic Rate (BMR)
                </div>
                <div className="mb-5 flex flex-col text-center">
                    <div className="text-text-xxl font-semibold text-secondary">
                        {getBmr({
                            weight: userState?.profile?.data?.weight,
                            height: userState?.profile?.data?.height,
                            age: userState?.profile?.data?.age,
                            gender: userState?.profile?.data?.gender,
                        })}{' '}
                        kcal/day
                    </div>
                    <div className="text-text-sm text-muted-foreground">
                        Your BMR is the number of calories your body needs to
                        maintain basic physiological functions at complete rest.
                    </div>
                </div>
                <div className="mb-5">
                    <div className="mb-2 text-text-md font-semibold">
                        How BMR is Calculated:
                    </div>
                    <div className="text-text-sm text-muted-foreground">
                        We use the Mifflin-St Jeor Equation, which is considered
                        one of the most accurate formulas:
                    </div>
                </div>
                <div className="pl-3">
                    {userState?.profile?.data?.gender === 'male' ? (
                        <div>
                            <div className="text-text-sm font-semibold">
                                For Men:
                            </div>
                            <div className="mb-2 text-text-sm">
                                BMR = (10 × weight in kg) + (6.25 × height in
                                cm) - (5 × age in years) + 5
                            </div>
                            <div className="text-text-sm text-muted-foreground">
                                Your calculation: (10 ×{' '}
                                {userState?.profile?.data?.weight} in kg) +
                                (6.25 × {userState?.profile?.data?.height} in
                                cm) - (5 ×{userState?.profile?.data?.age} in
                                years) + 5 ={' '}
                                {getBmr({
                                    weight: userState?.profile?.data?.weight,
                                    height: userState?.profile?.data?.height,
                                    age: userState?.profile?.data?.age,
                                    gender: userState?.profile?.data?.gender,
                                })}{' '}
                                kcal
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="text-text-sm font-semibold">
                                For Women:
                            </div>
                            <div className="mb-2 text-text-sm">
                                BMR = (10 × weight in kg) + (6.25 × height in
                                cm) - (5 × age in years) - 161
                            </div>
                            <div className="text-text-sm text-muted-foreground">
                                Your calculation: (10 ×{' '}
                                {userState?.profile?.data?.weight} in kg) +
                                (6.25 × {userState?.profile?.data?.height} in
                                cm) - (5 ×{userState?.profile?.data?.age} in
                                years) - 161 ={' '}
                                {getBmr({
                                    weight: userState?.profile?.data?.weight,
                                    height: userState?.profile?.data?.height,
                                    age: userState?.profile?.data?.age,
                                    gender: userState?.profile?.data?.gender,
                                })}{' '}
                                kcal
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* -- Profile TDEE -- */}
            <div className="container mx-auto mb-5 max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                <div className="mb-5 text-text-md font-semibold">
                    Total Daily Energy Expenditure (TDEE)
                </div>
                <div className="mb-5 flex flex-col text-center">
                    <div className="text-text-xxl font-semibold text-primary">
                        {userState?.profile?.data?.calorieTarget} kcal/day
                    </div>
                    <div className="text-text-sm text-muted-foreground">
                        Your TDEE is the total number of calories you burn in a
                        day, including all activities and exercise.
                    </div>
                </div>
                <div className="mb-5">
                    <div className="mb-2 text-text-md font-semibold">
                        How TDEE is Calculated:
                    </div>
                    <div className="text-text-sm text-muted-foreground">
                        TDEE is calculated by multiplying your BMR by an
                        activity factor based on your lifestyle:
                    </div>
                </div>
                <div className="pl-3">
                    <div className="text-text-sm font-semibold">
                        Activity Multipliers:
                    </div>
                    <ul className="mb-2 text-text-sm text-muted-foreground">
                        <li className="mb-1">
                            - Sedentary (little/no exercise): BMR × 1.2
                        </li>
                        <li className="mb-1">
                            - Light (exercise 1-3 times/week): BMR × 1.375
                        </li>
                        <li className="mb-1">
                            - Moderate (exercise 3-5 times/week): BMR × 1.55
                        </li>
                        <li className="mb-1">
                            - Very Active (hard exercise 6-7 times/week): BMR ×
                            1.725
                        </li>
                        <li className="mb-1">
                            - Extra Active (very hard exercise + phyisical job):
                            BMR × 1.9
                        </li>
                    </ul>
                    <div className="text-text-sm">
                        Your calculation:{' '}
                        {getBmr({
                            weight: userState?.profile?.data?.weight,
                            height: userState?.profile?.data?.height,
                            age: userState?.profile?.data?.age,
                            gender: userState?.profile?.data?.gender,
                        })}{' '}
                        ×{' '}
                        {userState?.profile?.data?.activity === 'sedentary'
                            ? '1.2'
                            : userState?.profile?.data?.activity === 'light'
                              ? '1.375'
                              : userState?.profile?.data?.activity ===
                                  'moderate'
                                ? '1.55'
                                : userState?.profile?.data?.activity ===
                                    'active'
                                  ? '1.725'
                                  : '1.9'}{' '}
                        = {userState?.profile?.data?.calorieTarget} kcal
                    </div>
                </div>
            </div>
            {/* -- Profile Calorie Goal -- */}
            {/* <div className="container mx-auto mb-5 max-w-[850px] rounded-md border border-[#cfcfcf] bg-white p-8 shadow-md">
                <div className="mb-5 text-text-md font-semibold">
                    Your Calorie Goal Analysis
                </div>
                <div className="flex flex-col text-center">
                    <div className="text-text-sm font-semibold text-muted-foreground">
                        Goal vs Recommended (TDEE)
                    </div>
                    <div className="text-text-xxl font-semibold text-accent-orange">
                        2000 kcal/day
                    </div>
                    <div className="mb-2 text-text-xs text-muted-foreground">
                        Deficit from TDEE
                    </div>
                    <div className="text-text-sm text-muted-foreground">
                        You're eating fewer calories than you burn, which may
                        lead to weight loss.
                    </div>
                </div>
            </div> */}
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
