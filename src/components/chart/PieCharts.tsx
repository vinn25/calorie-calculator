import {
    Cell,
    Legend,
    Pie,
    ResponsiveContainer,
    Tooltip,
    PieChart,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface Props {
    carbs: number;
    protein: number;
    fat: number;
}

const PieCharts = ({ carbs, protein, fat }: Props) => {
    const macroData = [
        { name: 'Carbohydrates', value: carbs },
        { name: 'Proteins', value: protein },
        { name: 'Fats', value: fat },
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
                    label={({ name, value }) => `${name}: ${value} g`}
                >
                    {macroData.map((entry, index) => (
                        <Cell
                            key={`cell-macro-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip
                    formatter={(value: number) => `${value} g`}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PieCharts;
