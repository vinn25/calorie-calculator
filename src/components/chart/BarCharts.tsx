import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    vitaminc: number;
    calcium: number;
    iron: number;
    vitamind: number;
    potassium: number;
}

const BarCharts = ({ vitaminc, calcium, iron, vitamind, potassium }: Props) => {
    const microData = [
        { name: 'Vitamin C', value: vitaminc },
        { name: 'Calcium', value: calcium },
        { name: 'Iron', value: iron },
        { name: 'Vitamin D', value: vitamind },
        { name: 'Potassium', value: potassium },
    ];
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={microData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarCharts;
