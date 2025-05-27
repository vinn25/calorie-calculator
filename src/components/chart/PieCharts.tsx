import React from 'react';
import {
    Cell,
    Legend,
    Pie,
    ResponsiveContainer,
    Tooltip,
    PieChart,
} from 'recharts';

// interface Props {
//     data:
// }

const macroData = [
    { name: 'Carbohydrates', value: 180 },
    { name: 'Proteins', value: 75 },
    { name: 'Fats', value: 45 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieCharts = () => {
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
