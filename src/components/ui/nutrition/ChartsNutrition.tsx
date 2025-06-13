import Card from '@/components/card/Card';
import PieCharts from '@/components/chart/PieCharts';
import { TextField } from '@/components/form';
import Progress from '@/components/progress/Progress';
import { getUserListLog, getUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartTodayNutrition from './TodayMacroNutrition';
import ChartAggregateNutrition from './AggregateMacroNutrition';

interface Props {
    getRange: string;
}

const ChartsNutrition = ({ getRange }: Props) => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const id = authState.profile?.data?.userId
        ? authState.profile?.data?.userId
        : null;
    useEffect(() => {
        async function getProfile() {
            await dispatch<any>(getUserProfile({ id: id }));
        }
        getProfile();
    }, [dispatch, id]);
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id: id, range: getRange }));
        }
        getLogs();
    }, [dispatch, id, getRange]);
    console.log(getRange)
    return (
        <div className="w-full max-w-full justify-stretch bg-[#ffffff]">
            {getRange === 'today' ? (
                <ChartTodayNutrition key="today" user={userState} />
            ) : (
                <ChartAggregateNutrition key={getRange} user={userState} />
            )}
        </div>
    );
};

export default ChartsNutrition;
