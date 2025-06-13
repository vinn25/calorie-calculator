import BarCharts from '@/components/chart/BarCharts';
import PieCharts from '@/components/chart/PieCharts';
import Progress from '@/components/progress/Progress';
import { getUserListLog, getUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartAggregateNutrition from './AggregateMacroNutrition';
import AggregateMicroNutrition from './AggregateMicroNutrition';
import TodayMicroNutrition from './TodayMicroNutrition';

interface Props {
    getRange: string;
}

const MicroNutrition = ({ getRange }: Props) => {
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

    return (
        <div className="w-full max-w-full justify-stretch bg-[#ffffff]">
            <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
                <div className="mb-7 grid grid-cols-1 gap-10">
                    {/* <Progress
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
                    /> */}
                    {getRange === 'today' ? (
                        <TodayMicroNutrition user={userState} />
                    ) : (
                        <AggregateMicroNutrition user={userState} />
                    )}

                </div>
            </div>
        </div>

        // <div className="flex flex-col justify-between rounded-[12px] border border-primary-dark bg-white p-6">
        //     <BarCharts
        //         vitaminc={userState?.list?.data?.totals?.vitaminc}
        //         calcium={userState?.list?.data?.totals?.calcium}
        //         iron={userState?.list?.data?.totals?.iron}
        //         vitamind={userState?.list?.data?.totals?.vitamind}
        //         potassium={userState?.list?.data?.totals?.potassium}
        //     />
        //     {/* <div className="mb-7 grid grid-cols-1 gap-10">
        //         <Progress
        //             current={80}
        //             target={200}
        //             type="nutrient"
        //             style="secondary"
        //             label="Vitamin C"
        //             fullWidth
        //         />
        //         <Progress
        //             current={26}
        //             target={200}
        //             type="nutrient"
        //             style="secondary"
        //             label="Calcium"
        //             fullWidth
        //         />
        //         <Progress
        //             current={80}
        //             target={200}
        //             type="nutrient"
        //             style="secondary"
        //             label="Iron"
        //             fullWidth
        //         />
        //         <Progress
        //             current={80}
        //             target={200}
        //             type="nutrient"
        //             style="secondary"
        //             label="Vitamin D"
        //             fullWidth
        //         />
        //         <Progress
        //             current={80}
        //             target={200}
        //             type="nutrient"
        //             style="secondary"
        //             label="Potassium"
        //             fullWidth
        //         />
        //     </div> */}
        // </div>
    );
};

export default MicroNutrition;
