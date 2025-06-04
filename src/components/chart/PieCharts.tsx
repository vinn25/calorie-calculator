import { getUserListLog, getUserProfile } from '@/redux/actions/user';
import { Reducers } from '@/redux/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Cell,
    Legend,
    Pie,
    ResponsiveContainer,
    Tooltip,
    PieChart,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieCharts = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state: Reducers) => state.user);
    const authState = useSelector((state: Reducers) => state.auth);
    const id = authState.profile?.data?.userId;
    useEffect(() => {
        async function getLogs() {
            await dispatch<any>(getUserListLog({ id }));
        }
        getLogs();
    }, [dispatch, id]);
    const macroData = [
        { name: 'Carbohydrates', value: userState?.list?.data?.totals?.carbs },
        { name: 'Proteins', value: userState?.list?.data?.totals?.protein },
        { name: 'Fats', value: userState?.list?.data?.totals?.fat },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={macroData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                >
                    {macroData.map((entry, index) => (
                        <Cell
                            key={`cell-macro-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieCharts;
