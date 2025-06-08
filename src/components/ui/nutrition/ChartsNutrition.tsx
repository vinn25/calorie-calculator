import Card from '@/components/card/Card';
import PieCharts from '@/components/chart/PieCharts';
import { TextField } from '@/components/form';
import Progress from '@/components/progress/Progress';
import { getUserListLog, getUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    // searchTerm: string;
    // setSearchTerm: any;
    // handleSearch: any;
    // params: {
    //     page: number;
    //     perPage: number;
    //     search: string;
    //     active: string;
    // };
    // cardTitle: string;
    // subCardTitle?: string;
}

const ChartsNutrition = (
    {
        // searchTerm,
        // setSearchTerm,
        // handleSearch,
        // params,
        // cardTitle,
        // subCardTitle,
    }: Props
) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const id = authState.profile?.data?.userId;
    useEffect(() => {
        async function getProfile() {
            await dispatch<any>(getUserProfile({ id }));
        }
        getProfile();
    }, [dispatch, id]);
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id }));
        }
        getLogs();
    }, [dispatch, id]);
    return (
        <div className="w-full max-w-full justify-stretch bg-[#ffffff]">
            <div className="grid grid-cols-2 gap-5">
                <div className="rounded-[12px] border border-primary-dark bg-white p-6">
                    <div>Macronutrient Distribution</div>
                    <div className="mb-6">
                        <PieCharts
                            carbs={userState?.list?.data?.totals?.carbs}
                            protein={userState?.list?.data?.totals?.protein}
                            fat={userState?.list?.data?.totals?.fat}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
                    <div>Consumed vs. Daily Target</div>
                    <div className="mb-7 grid grid-cols-1 gap-10">
                        <Progress
                            current={userState?.list?.data?.totals?.protein}
                            target={userState?.profile?.data?.proteinTarget}
                            type="nutrient"
                            style="primary"
                            label="Protein"
                            fullWidth
                        />
                        <Progress
                            current={userState?.list?.data?.totals?.fat}
                            target={userState?.profile?.data?.fatTarget}
                            type="nutrient"
                            style="accent"
                            label="Fat"
                            fullWidth
                        />
                        <Progress
                            current={userState?.list?.data?.totals?.carbs}
                            target={userState?.profile?.data?.carbTarget}
                            type="nutrient"
                            style="secondary"
                            label="Carbohydrates"
                            fullWidth
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChartsNutrition;
